import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import cookie from '../../utils/cookie';
import axios from 'axios';


export default function Keywords() {
  const [keywords, setKeywords] = React.useState([])
  const loadKeywords = async () => {
    try {
      const result = await axios("http://localhost:8080/api/user/keywords", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${cookie.getAccessTokenCookie()}`
        }
      })
      setKeywords(result.data)
    } catch (e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    loadKeywords()
  }, [])


  return (
    <React.Fragment>
      <Title>Keywords</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Word</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Search Result</TableCell>
            <TableCell>Adword</TableCell>
            <TableCell>Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {keywords.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.word}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.search_result}</TableCell>
              <TableCell>{row.adword}</TableCell>
              <TableCell>{row.link}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
