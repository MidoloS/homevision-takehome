"use client";

import { getFakeData } from "@/lib/fake-data";
import type { HouseData } from "@/lib/types";
import Image from "next/image";
import { useId } from "react";
import { SaveButton } from "./SaveButton";

type HouseProps = {
  house: HouseData;
};

const formatUsd = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

const BedroomIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-zinc-600 dark:text-zinc-300"
    aria-hidden
    focusable="false"
  >
    <path
      d="M0 9V4.5C0 2.43225 1.68225 0.75 3.75 0.75H14.25C16.3177 0.75 18 2.43225 18 4.5V9H15.75V8.25C15.75 6.5955 14.4045 5.25 12.75 5.25H11.25C10.35 5.25 9.5505 5.6565 9 6.2865C8.4495 5.6565 7.65 5.25 6.75 5.25H5.25C3.5955 5.25 2.25 6.5955 2.25 8.25V9H0ZM6.75 6.75H5.25C4.42275 6.75 3.75 7.42275 3.75 8.25V9H8.25V8.25C8.25 7.42275 7.57725 6.75 6.75 6.75ZM14.25 8.25C14.25 7.42275 13.5773 6.75 12.75 6.75H11.25C10.4227 6.75 9.75 7.42275 9.75 8.25V9H14.25V8.25ZM0 10.5V15C0 15.4148 0.336 15.75 0.75 15.75C1.164 15.75 1.5 15.4148 1.5 15V13.5H16.5V15C16.5 15.4148 16.8353 15.75 17.25 15.75C17.6647 15.75 18 15.4148 18 15V10.5H0Z"
      fill="currentColor"
    />
  </svg>
);

const SurfaceIcon = ({ clipPathId }: { clipPathId: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-zinc-600 dark:text-zinc-300"
    aria-hidden
    focusable="false"
  >
    <g clipPath={`url(#${clipPathId})`}>
      <path
        d="M8.99978 14.1285C8.57078 14.1285 8.14253 14.0137 7.76003 13.7842L0.363533 9.34649C0.00803342 9.13349 -0.106717 8.67299 0.106283 8.31749C0.318533 7.96124 0.779034 7.84724 1.13528 8.06024L8.53103 12.498C8.81978 12.6705 9.17903 12.6705 9.46778 12.498L16.8635 8.06024C17.219 7.84724 17.6795 7.96199 17.8925 8.31749C18.1055 8.67299 17.9908 9.13349 17.6353 9.34649L10.2395 13.7842C9.85703 14.0137 9.42803 14.1285 8.99978 14.1285ZM10.2395 17.0055L17.6353 12.5677C17.9908 12.3547 18.1055 11.8942 17.8925 11.5387C17.6795 11.1832 17.219 11.0685 16.8635 11.2815L9.46703 15.7192C9.17903 15.8917 8.81978 15.8917 8.53103 15.7192L1.13603 11.2815C0.779783 11.0677 0.319283 11.1832 0.107033 11.5387C-0.105967 11.8942 0.00878341 12.3547 0.364283 12.5677L7.76003 17.0055C8.14253 17.2357 8.57153 17.3497 9.00053 17.3497C9.42953 17.3497 9.85853 17.2357 10.2403 17.0055H10.2395ZM8.99978 4.37549L12.9808 1.98674L10.2395 0.341992C9.47453 -0.117008 8.52428 -0.117008 7.75928 0.341992L5.01803 1.98674L8.99903 4.37549H8.99978ZM17.636 4.77974L14.4388 2.86124L10.4578 5.24999L14.7268 7.81124L17.636 6.06599C17.8618 5.93024 17.9998 5.68649 17.9998 5.42324C17.9998 5.15999 17.8618 4.91474 17.636 4.77974ZM7.54178 5.24999L3.56078 2.86124L0.363533 4.77974C0.137783 4.91549 -0.000216587 5.15924 -0.000216587 5.42249C-0.000216587 5.68574 0.137783 5.93024 0.363533 6.06524L3.27278 7.81049L7.54178 5.24999ZM8.99978 6.12449L4.73078 8.68574L7.76003 10.503C8.14253 10.7325 8.57078 10.8472 8.99978 10.8472C9.42878 10.8472 9.85703 10.7325 10.2395 10.503L13.2688 8.68574L8.99978 6.12449Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id={clipPathId}>
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const House = ({ house }: HouseProps) => {
  const { bedrooms, sqMeters } = getFakeData(house.id);
  const priceLabel = formatUsd(house.price);
  const surfaceClipId = useId().replace(/:/g, "");

  const photoAlt = `Property photo: ${house.address}`;

  return (
    <article
      className="overflow-hidden"
      aria-label={`Property listing at ${house.address}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={house.photoURL}
          alt={photoAlt}
          fill
          className="object-cover scale-[1.16]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <SaveButton house={house} />
      </div>
      <div className="mt-2">
        <p className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
          {priceLabel}
        </p>
        <p className="mt-1 text-sm text-zinc-800 dark:text-zinc-300">
          {house.address}
        </p>
        <p className="mt-2 flex gap-2 text-xs text-zinc-600 dark:text-zinc-300">
          <span
            className="inline-flex items-center gap-2"
            title="Bedrooms"
            aria-label={`${bedrooms} bedrooms`}
          >
            <span aria-hidden className="inline-flex items-center gap-2">
              <BedroomIcon />
              {bedrooms}
            </span>
          </span>
          •
          <span
            aria-hidden
            title="Surface area"
            className="inline-flex items-center gap-2"
          >
            <SurfaceIcon clipPathId={surfaceClipId} /> {sqMeters}
          </span>
        </p>
      </div>
    </article>
  );
};
