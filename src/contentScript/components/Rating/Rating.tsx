import "./Rating.css"
import { useState } from "react"

const totalRating = Array.from({ length: 5 }, (_, index) => index + 1)

export function Rating() {
    const [rating, setRating] = useState<number>(0)
    const [hover, setHover] = useState<number>(0)

    console.log("Rating", totalRating)
    return (
        <div className="rating">
            {totalRating.map((star, index) => {
                console.log(star, index)
                const currentRating = index + 1

                return (
                    <label key={index}>
                        <input
                            key={star}
                            type="radio"
                            name="rating"
                            value={currentRating}
                            onChange={() => setRating(currentRating)}
                        />
                        <span
                            className="star"
                            style={{
                                color:
                                    currentRating <= (hover || rating)
                                        ? "#ffc107"
                                        : "#e4e5e9",
                            }}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(0)}
                        >
                            &#9733;
                        </span>
                    </label>
                )
            })}
        </div>
    )
}
