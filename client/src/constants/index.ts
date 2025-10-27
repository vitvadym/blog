import {
  DocumentChartBarIcon,
  ListBulletIcon,
  ChatBubbleBottomCenterIcon,
  PlusIcon,
} from '@heroicons/react/20/solid';
import React from 'react';

const className = 'w-5 h-5';

const SIDEBAR_MENU_ITEMS = [
  {
    name: 'Dashboard',
    path: '/admin',
    icon: React.createElement(DocumentChartBarIcon, { className }),
  },

  {
    name: 'Posts',
    path: 'posts',
    icon: React.createElement(ListBulletIcon, { className }),
  },

  {
    name: 'Comments',
    path: 'comments',
    icon: React.createElement(ChatBubbleBottomCenterIcon, {
      className,
    }),
  },

  {
    name: 'New Post',
    path: 'add',
    icon: React.createElement(PlusIcon, { className }),
  },
];

const POST_TABLE_HEADERS = ['#', 'Title', 'Date', 'Status', 'Actions'];
const COMMENTS_TABLE_HEADERS = ['#', 'Post & Comment', 'Date', 'Actions'];

export { SIDEBAR_MENU_ITEMS, POST_TABLE_HEADERS, COMMENTS_TABLE_HEADERS };
