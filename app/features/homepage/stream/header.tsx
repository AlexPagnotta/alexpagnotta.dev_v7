export const StreamHeader = () => {
  return (
    <header className="relative flex flex-col gap-16 lg:gap-32">
      <h2 className="relative isolate display md:text-center lg:text-left text-white self-start md:self-auto">
        <span className="relative z-10 inline-flex">THE STREAM </span>
        <span className="absolute md:static -top-25 scale-125 md:scale-0 -right-20 font-normal text-yellow">✷</span>
      </h2>

      <p className="body-2 text-white lg:text-right md:text-center">
        Part blog, part portfolio, part social media
        <br />
        With advent of AI I am not just a dev I am a maker
      </p>
      <div className="absolute -bottom-32 left-80 lg:block hidden">
        <p className="body-1 -rotate-6 rounded-md bg-yellow px-20 py-12 text-center text-black">
          This counts as
          <br />
          doom scrolling!
        </p>
      </div>
    </header>
  );
};
