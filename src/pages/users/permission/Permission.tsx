export default () => {
  
  return (
    <>
      <h2 class="text-lg font-semibold mb-2 sm:mb-3 dark:text-white">
        ຜູ້ໃຊ້ທັງໝົດ
      </h2>
      <ol class="text-gray-500 list-decimal list-inside dark:text-gray-400 grid gap-4 sm:grid-cols-2 sm:gap-6">
        <li>
          User
          <ul class="ps-5 mt-2 space-y-1 list-disc list-inside">
            <li>
              <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                user:read
              </span>
              : ສາມາດເບິ່ງລາຍການຜູ້ໃຊ້ໄດ້
            </li>
            <li>
              <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                user:write
              </span>
              : ສາມາດເພີ່ມແລະແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້ໄດ້
            </li>
            <li>
              <span class="bg-red-100 redtext-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                user:remove
              </span>{" "}
              ສາມາດລົບຂໍ້ມູນຜູ້ໃຊ້ໄດ້
            </li>
          </ul>
        </li>
        <li>
          Test
          <ul class="ps-5 mt-2 space-y-1 list-disc list-inside">
            <li>
              <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                test:read
              </span>
              : ສາມາດເບິ່ງລາຍການໄດ້
            </li>
            <li>
              <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                test:write
              </span>
              : ສາມາດເພີ່ມແລະແກ້ໄຂຂໍ້ມູນໄດ້
            </li>
            <li>
              <span class="bg-red-100 redtext-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                test:remove
              </span>{" "}
              ສາມາດລົບຂໍ້ມູນໄດ້
            </li>
          </ul>
        </li>
      </ol>
    </>
  );
};
