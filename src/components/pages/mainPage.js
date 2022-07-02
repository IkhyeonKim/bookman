import React, { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import { getBookList, getBookListWithStatus, postRentalEnd, postRentalStart } from "../../apis";

const MainPage = () => {
  const [bookIdList, setBookList] = useState([]);
  const [bookListWithStatus, setBookListWithStatus] = useState([]);

  const renderBookList = useCallback(() => {
    return bookIdList.map((book) => {
      return (
        <li key={book.id}>
          {book.name}
          {book.status}
        </li>
      );
    });
  }, [bookIdList]);

  useEffect(() => {
    const fetchBookList = async ({ offset, limit }) => {
      return await getBookListWithStatus({ offset, limit }).then((data) => {
        console.log("@@@@@", { data });
        setBookList(data);
        return data;
      });
    };
    fetchBookList({ offset: 0, limit: 20 });
  }, []);

  useEffect(() => {
    if (bookIdList && bookIdList.length > 0) {
    }
  }, [bookIdList]);

  return (
    <div>
      <div>{bookIdList && renderBookList()}</div>
      <div>
        <Button
          type="primary"
          onClick={() =>
            postRentalStart({ bookId: 2, userId: 2 }).then((data) => console.log(data))
          }
        >
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
