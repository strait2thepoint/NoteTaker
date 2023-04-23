module.exports = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

    //code obtained from MSU-VIRT-FSF-PT-01-2023-U-LOLC\11-Express\01-Activities\18-Stu_POST-Fetch\Solved\helpers\uuid.js