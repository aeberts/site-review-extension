import { MessageRate } from "../../../types/message.types"
import { sendMessage } from "../../messages/sendMessage"
import { clearUrlParams } from "../..//utils/url"
import "./Rating.css"
import { useCallback, useEffect, useState } from "react"

const totalRating = Array.from({ length: 5 }, (_, index) => index + 1)

export function Rating() {
    const [rating, setRating] = useState<number>(0)
    const [hover, setHover] = useState<number>(0)
    const cleanUrl = clearUrlParams(window.location.href)

    useEffect(() => {
        async function loadRating(url: string) {
            try {
                const rate = await sendMessage<MessageRate, number>({
                    type: "rating",
                    subType: "get",
                    data: { url },
                })
                if (rate) {
                    setRating(rate)
                }
            } catch (error) {
                console.error(error)
            }
        }
        loadRating(cleanUrl)
    }, [cleanUrl])

    const updateRating = useCallback(async (newRating: number) => {
        try {
            await sendMessage<MessageRate, void>({
                type: "rating",
                subType: "update",
                data: { url: cleanUrl, rate: newRating },
            })
            setRating(newRating)
        } catch (error) {
            console.error(error)
        }
    }, [])

    return (
        <div className="rating">
            {totalRating.map((star, index) => {
                const currentRating = index + 1

                return (
                    <label key={index}>
                        <input
                            key={star}
                            type="radio"
                            name="rating"
                            data-testid={`input-${index}`}
                            value={currentRating}
                            onChange={() => updateRating(currentRating)}
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
