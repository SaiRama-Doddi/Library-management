import BookModel from "../../models/BookModel";

export const SearchBook: React.FC<{ book: BookModel }> = (props) => {
    return (
        <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
            <div className="row g-0">
                
                {/* Book Image Section */}
                <div className="col-md-2 d-flex justify-content-center align-items-center">
                    {props.book.img ? (
                        <img src={props.book.img} width={123} height={196} alt="Book" />
                    ) : (
                        <img
                            src={require("../../../Images/BooksImages/book-luv2code-1000.png")}
                            width={123}
                            height={196}
                            alt="Book"
                        />
                    )}
                </div>

                {/* Book Details Section */}
                <div className="col-md-7">
                    <div className="card-body">
                        <h5 className="card-title">{props.book.author}</h5>
                        <h4>{props.book.title}</h4>
                        <p className="card-text">{props.book.description}</p>
                    </div>
                </div>

                {/* View Details Button */}
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <a className="btn btn-md main-color text-white" href="#">
                        View Details
                    </a>
                </div>

            </div>
        </div>
    );
};
