import {
  addingBooks,
  deleteAll,
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
  {
    method: 'DELETE',
    path: '/books',
    handler: deleteAll,
  },
];

export default routes;
