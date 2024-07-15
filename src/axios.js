import axios from 'axios';
import { useEffect, useState } from 'react'

export default function BoardListAxios() {
    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
        axios.get('https://koreanjson.com/posts')
            .then(res => {
          		console.log(res);
                console.log(res.data);
                setBoardList(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <h1>axios를 통해 get 요청하기</h1>
            {
                boardList.map((e) => {
                    return (
                        <div>
                            <h1>
                                제목: {e.title}
                            </h1>
                            <p>작성일 : {e.createdAt}</p>
                        </div>
                    );
                })
            }
        </>
    )
}