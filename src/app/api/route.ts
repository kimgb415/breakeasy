import { NextResponse, type NextRequest } from 'next/server'
import fs from 'fs';
import path from 'path';
 
export const dynamic = 'force-dynamic' // defaults to auto
export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  // query is "hello" for /api/search?query=hello

}


const exportCsv = summary => {
  const csvRows = [
    // [`,Team ${leftTeam}`, `Team ${rightTeam}`],
    ...Object.entries(summary).map(([area, scores]) =>[area, ...scores].join(',')),
  ];
  const csvString = csvRows.join('\n');
  console.log(csvString);
  // // const blob = new Blob([csvString], { type: 'text/csv' });
  // // const url = URL.createObjectURL(blob);
  // // console.log(blob);
  // // console.log(url);
}


export async function POST(request: Request) {
    const bodyData  = await request.json();
    console.log(bodyData)


    const filePath = path.join('public', 'yourDataFile.json');
    fs.writeFile(filePath, JSON.stringify(bodyData), (err) => {
      if (err)
        console.log(err)
    })

    return new NextResponse('Success', {
      status: 200
    })
}