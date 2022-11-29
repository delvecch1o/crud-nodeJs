import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
  background-color: #2f2f2e;

`

export const Tr = styled.tr`

`

export const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 800px;
  margin: 20px auto;
  word-break: break-all;


`

export const Thead = styled.thead`

`

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
    
`

export const Tbody = styled.tbody`

`

export const TdIcone = styled.td`
  padding-top: 15px;
  width: 30%;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  wisth: ${(props) => (props.width ? props.width : "auto")};
    
  cursor: pointer;
  a {
    text-decoration: color;
    color: #c1c9ff;
  }
`
export const Td = styled.td`
  padding-top: 15px;
  width: 30%;

`

export const Label = styled.label`
  font-size: 20px;
  font-weight: 600;
  color: #676767;
`

export const Strong = styled.strong`
  align-items: left;
  cursor: pointer;
  a {
    text-decoration: none;
    color: #c1c9ff;
  }
`