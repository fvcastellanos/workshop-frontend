
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {


    const cookieStore = cookies()
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    if (!supabase) {

        return NextResponse.redirect('/')

    }

    try {

        const formData = await request.formData()
        const email = String(formData.get('email'))
        const password = String(formData.get('password'))
    
        const tokenResponse = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (tokenResponse.data) {

            return NextResponse.json({
                user: tokenResponse.data.user
            });
        }

        if (tokenResponse.error) {

            return NextResponse.json({
                error: 'Unable to authenticate user'
            }, {
                status: 401
            })
        }
    
    } catch (error) {


    }


    // return NextResponse.
}
