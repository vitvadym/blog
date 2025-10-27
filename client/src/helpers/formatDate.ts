import dayjs from 'dayjs';

const formatDate = (dateString: string) => {
  return dayjs(dateString).format('DD MMM YYYY');
};

export { formatDate };
