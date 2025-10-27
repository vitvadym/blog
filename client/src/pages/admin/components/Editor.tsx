import { useRef, useEffect } from 'react';
import usePostStore from '../../../store/postStore';
import { toast } from 'sonner';
import { SparklesIcon } from '@heroicons/react/20/solid';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useMutation } from '@tanstack/react-query';
import { aiService } from '../../../api/aiService';
import type { AxiosError } from 'axios';

const Editor = () => {
  const { title, setPost } = usePostStore();
  const quillRef = useRef<Quill | null>(null);
  const editorContainerRef = useRef<HTMLDivElement | null>(null);

  const { mutate: generateContent, isPending: isGenerating, isSuccess: isGenerated } = useMutation({
    mutationFn: async () =>
      aiService.generateContent<string, { message: string; content: string }>(
        title,
      ),
    onSuccess: (data) => {
      quillRef.current?.clipboard.dangerouslyPasteHTML(data.content);
      setPost({ content: data.content });
      quillRef.current?.enable();
      toast.success(data.message);
    },
    onMutate: () => {
      quillRef.current?.disable();
    },
    onError: (error) => {
      toast.error(
        (error as AxiosError<{ message: string }>).response?.data.message,
      );
      quillRef.current?.enable();
    },
  });

  useEffect(() => {
    if (editorContainerRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorContainerRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            ['code-block', 'blockquote'],
            [{ align: [] }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['clean'],
          ],
        },
      });
    }
  }, []);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;

    quill.on('text-change', () => {
      const content = quill.root.innerHTML;
      setPost({ content });
    });
  }, []);


  const handleGenerate = () => {
    if (!title) {
      toast.warning('Please provide a title before generating content.');
      return;
    }
    generateContent();
  };

  return (
    <div className='relative'>
      <div
        ref={editorContainerRef}
        style={{ height: '600px' }}
      ></div>

      <button
      disabled={isGenerating || isGenerated}
        onClick={handleGenerate}
        data-tip='Generate post content with AI'
        className='absolute bottom-2 left-2 text-primary btn btn-ghost btn-sm tooltip'
      >
        <SparklesIcon className='h-6 w-6 animate-pulse' />
      </button>
      {isGenerating && (
        <span className='absolute loading loading-spinner top-1/2 left-1/2'></span>
      )}
    </div>
  );
};

export default Editor;
