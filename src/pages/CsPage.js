import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  flex-grow: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  height: 150px;
`;

const FileInput = styled.input`
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
`;

function CSPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 여기에 이메일 전송 로직 구현
    // 예: API 호출을 통한 이메일 전송
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      files.forEach((file, index) => {
        formData.append(`file${index + 1}`, file);
      });

      // API 호출 예시
      // await axios.post('/api/send-email', formData);

      alert('문의가 성공적으로 전송되었습니다.');
      // 페이지 리프레시
      window.location.reload();
    } catch (error) {
      console.error('이메일 전송 실패:', error);
      alert('문의 전송에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 2) {
      alert('최대 2개의 파일만 첨부할 수 있습니다.');
      return;
    }
    setFiles(Array.from(e.target.files));
  };

  return (
    <PageContainer>
      <Header>
        <BackButton onClick={() => navigate('/')}>←</BackButton>
        <Title>1:1 문의</Title>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="문의 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextArea
          placeholder="문의 내용을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <FileInput
          type="file"
          onChange={handleFileChange}
          multiple
          accept="image/*"
        />
        <SubmitButton type="submit">문의하기</SubmitButton>
      </Form>
    </PageContainer>
  );
}

export default CSPage;