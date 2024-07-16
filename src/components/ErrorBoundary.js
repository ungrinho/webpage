import React from 'react';
import styled from 'styled-components';

const ErrorMessage = styled.h1`
  color: red;
  text-align: center;
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 여기서 에러 로깅 서비스에 에러를 보낼 수 있습니다.
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorMessage>오류가 발생했습니다. 페이지를 새로고침 해주세요.</ErrorMessage>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;