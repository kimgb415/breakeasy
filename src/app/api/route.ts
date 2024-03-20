import { NextResponse, type NextRequest } from 'next/server'
import fs from 'fs';
import path from 'path';


export async function POST(request: Request) {
    const bodyData  = await request.json();
    console.log(bodyData);
    
    
    const matchName = bodyData.matchData.matchName;
    const roundSummaryPath = path.join('public', `${matchName}.json`);
    const matchSummaryPath = path.join('public', `${matchName}_total.json`);
    fs.writeFile(roundSummaryPath, JSON.stringify(bodyData.matchData), (err) => {
      if (err)
        console.log(err)
    })

    fs.writeFile(matchSummaryPath, JSON.stringify(bodyData.summary), (err) => {
      if (err)
        console.log(err)
    })

    return new NextResponse('Success', {
      status: 200
    })
}