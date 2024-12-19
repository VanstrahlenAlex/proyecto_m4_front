import { NextResponse } from "next/server";

export function middleware(request: Request) {
	const user = ""	;

	if(!user){
		return NextResponse.redirect(new URL('/login', request.url));
	}

	return NextResponse.next();
}