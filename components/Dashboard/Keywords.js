import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';


export default function Keywords({ keywords }) {


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
            <TableCell>Total Link</TableCell>
            <TableCell>HTML FIle</TableCell>
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
              <TableCell><a href={getHtmlLink(row.html_file_path)} target="_blank" rel="noreferrer">LINK</a></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}


const getHtmlLink = (link) => {
  const htmlLink = process.env.NEXT_PUBLIC_SERVER_STATIC_HOST + link
  return htmlLink
}