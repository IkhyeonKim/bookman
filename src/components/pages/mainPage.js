import React, { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import { getBookList, postRentalEnd, postRentalStart } from "../../apis";

const MainPage = () => {
  const [bookList, setBookList] = useState([]);

  const renderBookList = useCallback(() => {
    return bookList.map((book) => {
      return <li key={book.id}>{book.name}</li>;
    });
  }, [bookList]);

  useEffect(() => {
    const fetchBookList = async ({ offset, limit }) => {
      return await getBookList({ offset, limit }).then((data) => {
        setBookList(data.data);
        return data.data;
      });
    };
    fetchBookList({ offset: 0, limit: 20 });
  }, []);

  return (
    <div>
      <div>{bookList && renderBookList()}</div>
      <div>
        <Button type="primary" onClick={() => postRentalStart({ bookId: 2, userId: 2 })}>
          대여하기
        </Button>
        <Button type="primary" onClick={() => postRentalEnd({ bookId: 2, userId: 2 })}>
          대여종료
        </Button>
      </div>
    </div>
  );
};

export default MainPage;
