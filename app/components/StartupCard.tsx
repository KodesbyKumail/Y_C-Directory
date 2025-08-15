import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import React from 'react'
import { Author } from '@/sanity.types'
import Link from 'next/link'
import { Startup } from '@/sanity.types'
import { urlFor } from '@/sanity/lib/image'; 
export type StartupCardType = Omit<Startup, "author"> & { author?: Author };
const StartupCard = ({ post }: { post: StartupCardType }) => {
    const { _createdAt, _id, views, author, title, description, image, category } = post;
    const createdAtDate = new Date(_createdAt);
    const formattedDate = isNaN(createdAtDate.getTime()) ? 'Invalid Date' : formatDate(createdAtDate);

    return (
        <li className="startup-card group">
            <div className="flex-between">
                <p className="startup-card_date">
                    {formattedDate}
                </p>
                <div className="flex gap-1.5">
                    <span className="text-[16px] font-bold text-black">
                        {views}
                    </span>
                    <EyeIcon className="size-6 text-primary" />
                </div>
            </div>
            <div className="flex-between mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/user/${author?._id}`}>
                        <p className="text-[17px] font-medium line-clamp-1">
                            {author?.name || author?.username}
                        </p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className="text-lg font-semibold line-clamp-1">
                            {title}
                        </h3>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <p className="startup-card_desc">
                            {description}
                        </p>
                        <img src={image} alt="startup image" className="startup-card_img" />
                    </Link>
                </div>
            </div>
            <div className="flex-between mt-5 gap-5">
                <Link href={`./query=${category?.toLowerCase()}`}>
                    <p className="text-[14px] font-semibold mt-2 p-2">
                        {category}
                    </p>
                </Link>
                <Link href={`/startup/${_id}`} className="startup-card_btn items-center">
                    View Startup
                </Link>
            </div>
        </li>
    )
}

export default StartupCard
