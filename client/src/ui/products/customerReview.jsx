import React from "react";
import { CustomerReviews } from "../../utils/customerReview";

const CustomerReview = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-black/10">
      <div className="flex flex-col gap-1 mb-8">
        <h2 className="font-poppins font-medium text-xl sm:text-2xl text-neutral-900">
          Customer Reviews
        </h2>
        <p className="font-poppins text-xs sm:text-sm text-neutral-500">
          Verified experiences from our community
        </p>
      </div>

      <div className="flex flex-row gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {CustomerReviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col shrink-0 w-72 sm:w-84 border border-black/10 p-5 bg-white justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex flex-col">
                  <h3 className="font-poppins font-medium text-sm text-neutral-900">
                    {review.customerName}
                  </h3>
                  <span className="font-poppins text-[11px] text-neutral-400">
                    {review.date}
                  </span>
                </div>
                <div className="flex text-amber-500 text-xs">
                  {"★".repeat(review.rating)}
                </div>
              </div>

              <p className="font-poppins text-xs sm:text-sm text-neutral-600 leading-relaxed italic">
                "{review.review}"
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-black/5 text-[11px] font-poppins text-neutral-400">
              Purchased:{" "}
              <strong className="text-neutral-700 font-medium">
                {review.productName}
              </strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReview;
