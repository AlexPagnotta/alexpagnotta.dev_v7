export const StreamHeader = () => {
  return (
    <header className="flex flex-col gap-24">
      <h2 className="display text-center text-white">
        THE STREAM <span className="font-normal text-yellow">✷</span>
      </h2>
      <div className="flex flex-col items-start gap-24 lg:flex-row-reverse lg:justify-between">
        <p className="body-3 text-white lg:text-right">
          Part blog, part portfolio, part social media
          <br />
          With advent of AI I am not just a dev I am a maker
        </p>
        <p className="caption rotate-6 rounded-md bg-yellow px-12 py-14 text-center text-black">
          This counts as
          <br />
          doom scrolling!
        </p>
      </div>
    </header>
  );
};
