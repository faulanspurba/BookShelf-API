/* eslint-disable import/extensions */

import {
  addingBooks,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from './handlers.js';

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addingBooks,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookById,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBook,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook,
  },
];

export default routes;
