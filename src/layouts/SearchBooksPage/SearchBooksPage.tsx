
import { useEffect, useState } from "react";
import BookModel from "../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";
import { Pagination } from "../Utils/Pagination";
import { error } from "console";


export const SearchBooksPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [searchUrl, setSearchUrl] = useState('');
  const [categorySelection,setCategorySelection]=useState('Book category');



  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const baseUrl = "http://localhost:8080/api/books";
        let url = "";

        if (searchUrl == '') {
          url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
        } else {
          let searchWithPage=searchUrl.replace('<pageNumber>',`${currentPage-1}`)
          url = baseUrl + searchWithPage;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseJson = await response.json();
        const responseData = responseJson._embedded.books;
        setTotalAmountOfBooks(responseJson.page.totalElements);
        setTotalPages(responseJson.page.totalPages)

        const loadedBooks: BookModel[] = responseData.map((book: any) => ({
          id: book.id,
          title: book.title,
          author: book.author,
          description: book.description,
          copies: book.copies,
          copiesAvailable: book.copiesAvailable,
          category: book.category,
          img: book.img,
        }));

        setBooks(loadedBooks);
      } catch (error: any) {
        setHttpError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks().catch((error: any) => {
      setLoading(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0)
  }, [currentPage, searchUrl]);

  if (isLoading) {
    return (
      <SpinnerLoading />
    );
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const searchHandleChange = () => {
    if (search.trim() === '') {
      setSearchUrl('');
    } else {
      setSearchUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`);
    }
    setCurrentPage(1); // Reset to first page on new search
  }


  const categoryFiled=(value: string)=>{
    
    if(
      value.toLowerCase()=='fe' ||
      value.toLowerCase()=='be' ||
      value.toLowerCase()=='data'||
      value.toLowerCase()=='devops'

    ){
      setCategorySelection(value);
      setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`)
    }
    else{
      setCategorySelection('All');
      setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`)
    }
    setCurrentPage(1);

  }

  const indexOfLastBook: number = currentPage * booksPerPage;
  const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
  let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ?
    booksPerPage * currentPage : totalAmountOfBooks;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  type="search"
                  className="form-control me-2"
                  placeholder="Search"
                  aria-labelledby="search"

                  onChange={e => setSearch(e.target.value)}
                />
                <button className="btn btn-outline-success" onClick={() => searchHandleChange()}>
                  Search

                </button>

              </div>

            </div>
            <div className="col-4">
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu" data-bs-toggle='dropdown' aria-expanded="false">
            {categorySelection}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li onClick={()=>categoryFiled('All')}>
                    <a href="#" className="dropdown-item">All</a>
                  </li>
                  <li onClick={()=>categoryFiled('FE')}>
                    <a href="#" className="dropdown-item">Frontend</a>
                  </li>
                  <li onClick={()=>categoryFiled('BE')}>
                    <a href="#" className="dropdown-item">Backend</a>
                  </li>
                  <li onClick={()=>categoryFiled('Data')}>
                    <a href="#" className="dropdown-item">Data</a>
                  </li>
                  <li onClick={()=>categoryFiled('DevOps')}>
                    <a href="#" className="dropdown-item">Devops</a>
                  </li>
                </ul>

              </div>

            </div>

          </div>
          {totalAmountOfBooks > 0 ?
            <>
              <div className="mt-3">
                <h5>Number of Results:{totalAmountOfBooks}</h5>
              </div>
              <p>{indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} Items</p>
              {books.map(book => (
                <SearchBook book={book} key={book.id} />

              ))}</>
            : <div className="m-5">
              <h3>Can't find what you are looking for</h3>
              <a href="#" type="button" className="btn main-color btn-md px-4 me-md-2 fw-bold text-white">Libraray services</a>

            </div>
          }

          {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
      </div>
    </div>
  )

}