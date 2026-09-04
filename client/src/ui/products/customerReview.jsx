import React from "react";
import { CustomerReviews } from "../../utils/customerReview";

const CustomerReview = () => {
  return (
    <section className="w-full py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-mid">
      <div className="flex flex-col gap-2 mb-8">
        <h2 className="font-poppins font-medium text-2xl sm:text-3xl text-black">
          Customer Reviews
        </h2>

        <p className="font-poppins text-sm text-black/60">
          — What our customers are saying
        </p>
      </div>

      <div className="flex flex-row gap-4 overflow-x-auto scrollbar-hide">
        {CustomerReviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col shrink-0 w-80 sm:w-96 border border-black/10 p-5 sm:p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col gap-1">
                <h3 className="font-poppins font-medium text-sm text-black">
                  {review.customerName}
                </h3>

                <span className="font-poppins text-xs text-black/50">
                  {review.date}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <span className="font-poppins text-sm text-black">
                  {"★".repeat(review.rating)}
                </span>
              </div>
            </div>

            <p className="font-poppins text-sm text-black/70 leading-relaxed mb-5">
              "{review.review}"
            </p>

            <div className="mt-auto pt-4 border-t border-black/10">
              <span className="font-poppins text-xs text-black/50">
                Purchased:{" "}
              </span>

              <span className="font-poppins text-xs text-black">
                {review.productName}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReview;