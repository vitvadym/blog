import { NewspaperIcon } from '@heroicons/react/20/solid';
// import { stats } from '../../mock';
import PostItem from './components/PostTableRow';
import StatCard from './components/StatCard';
import TableHeader from './components/TableHeader';
import { POST_TABLE_HEADERS } from '../../constants';
import usePostQuery from '../../hooks/usePostQuery';
import { dashboardStatsService } from '../../api/dashboardStatsService';
import { useQuery } from '@tanstack/react-query';
import PageLoader from '../../components/PageLoader';

type DashboardStats = {
  post: number;
  category: number;
  comment: number;
};

const Dashboard = () => {
  const { data, isLoading } = usePostQuery({ admin: true });
  const { data: stats } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => dashboardStatsService.getDashboardStats<DashboardStats>(),
  });

  const [, values] = Object.values(stats || {});

  return (
    <>
      {isLoading ? (
        <PageLoader />
      ) : (
        <div>
          <div className='flex flex-wrap gap-4'>
            {Object.entries(values || {}).map(([title, value]) => (
              <StatCard
                key={title}
                title={title}
                value={value}
              />
            ))}
          </div>

          <div className='flex items-center gap-3 m-4 mt-6'>
            <NewspaperIcon className='h-10 w-10' />
            <h1 className='text-2xl font-semibold'>Latest Posts</h1>
          </div>

          <div className='overflow-x-auto'>
            <table className='table'>
              <TableHeader headers={POST_TABLE_HEADERS} />
              <tbody>
                {data?.posts.map((post, index) => (
                  <PostItem
                    key={post.id}
                    order={index + 1}
                    post={post}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
