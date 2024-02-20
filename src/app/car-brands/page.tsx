import { createClient } from "@supabase/supabase-js";

export default async function CarBrands() {

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    let { data, error } = await supabase
        .from('car_brand')
        .select('*');

    return (
        <div>
            <h1>Car Brands</h1>
            <ul>
                {
                    data &&
                    data.map(brand => (
                        <li key={brand.id}>{brand.name}</li>
                    ))
                }
            </ul>
        </div>
    )
}