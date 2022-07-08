import books from './books.js';
import { nanoid } from 'nanoid';

const addingBooks = (req, h) => {
  const id = nanoid(16);

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  //   Checking if name is not empty
  if (!name) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      })
      .code(400);
  }

  //   Checking if readPage isn't bigger than pageCount
  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message:
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }
  let finished = false;
  if (readPage == pageCount) finished = true;

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const book = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
  };

  books.push(book);

  // Checking is success

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (!isSuccess) {
    return h
      .response({
        status: 'error',
        message: 'Buku gagal ditambahkan',
      })
      .code(500);
  }

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: { bookId: book.id },
    })
    .code(201);
};

const getAllBooks = (req, h) => {
  const booksData = books.map((book) => {
    return {
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    };
  });

  let { reading, finished } = req.query;

  if (reading) {
    const filteredByReadings = books.filter((book) => book.reading == reading);
    const result = filteredByReadings.map((book) => {
      return { id: book.id, name: book.name, publisher: book.publisher };
    });
    return h
      .response({
        status: 'success',
        data: {
          books: result,
        },
      })
      .code(200);
  }

  if (finished) {
    const filteredByFinished = books.filter(
      (book) => book.finished == finished
    );
    const result = filteredByFinished.map((book) => {
      return { id: book.id, name: book.name, publisher: book.publisher };
    });
    return h
      .response({
        status: 'success',
        data: {
          books: result,
        },
      })
      .code(200);
  }

  return h
    .response({
      status: 'success',
      data: {
        books: booksData,
      },
    })
    .code(200);
};

const getBookById = (req, h) => {
  const { bookId } = req.params;

  const book = books.filter((book) => book.id === bookId)[0];

  if (book === undefined) {
    return h
      .response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      })
      .code(404);
  }

  return h
    .response({
      status: 'success',
      data: {
        book,
      },
    })
    .code(200);
};

const updateBook = (req, h) => {
  const { bookId } = req.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index === -1)
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      })
      .code(404);

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  //   Checking if name is not empty
  if (!name)
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      })
      .code(400);

  //   Checking if readPage isn't bigger than pageCount
  if (readPage > pageCount)
    return h
      .response({
        status: 'fail',
        message:
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);

  const book = (books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updateAt: new Date().toISOString,
  });

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    })
    .code(200);
};

const deleteBook = (req, h) => {
  const { bookId } = req.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index === -1)
    return h
      .response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      })
      .code(404);

  books.splice(index, 1);

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    })
    .code(200);
};

const deleteAll = (req, h) => {
  books.splice(0, books.length);
  return h.response({ message: 'Deleting all books success' }).code(200);
};

export {
  addingBooks,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  deleteAll,
};
