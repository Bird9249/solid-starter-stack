import ArchiveIcon from "../icons/ArchiveIcon";

export default () => {
  return (
    <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <ArchiveIcon class="w-10 h-10 mb-2 text-gray-300 dark:text-gray-500" />
        <p class="mb-2 text-base text-gray-300 dark:text-gray-500">
          <span class="font-semibold">No data</span>
        </p>
      </div>
    </div>
  );
};
