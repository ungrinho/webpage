import React, { useEffect, useState } from 'react';

const BoardListFetch = () => {
    const [boardList, setBoardList] = useState([]);

    // 서버로부터 배열을 가져와서 boardList에다가 대입
    useEffect(() => {
        fetch('https://koreanjson.com/posts')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setBoardList(data);
            }, []);
    }
   );

    return (
        <>
            <h1>게시판 목록</h1>
            {
                boardList.map((e) => {
                    return (
                        <div>
                            {e.title}
                        </div>
                    );
                })
            }
        </>
    );
}

export default BoardListFetch;