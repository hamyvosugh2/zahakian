import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from('europe_zahakian')
      .insert({
        name: body.name,
        last_name: body.last_name,
        parent_names: body.parent_names,
        country: body.country,
        city: body.city,
        information: body.information,
        links: body.links || [],
        images: body.images || [],
        doc: body.doc || [],
        files: body.files || [],
        additional_info: body.additional_info,
        audit_1: body.audit_1 || false,
        audit_2: body.audit_2 || false,
        audit_3: body.audit_3 || false,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('europe_zahakian')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}