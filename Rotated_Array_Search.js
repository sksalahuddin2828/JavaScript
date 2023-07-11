function searchInRotatedArray(nums, target) {
    const n = nums.length;

    // Logic
    let start = 0;
    let end = n - 1;

    while (start <= end) {
        let mid = Math.floor((start + end) / 2);

        if (nums[mid] === target) {
            return mid;
        }

        // Two cases
        if (nums[start] <= nums[mid]) {
            // Left
            if (target >= nums[start] && target <= nums[mid]) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        } else {
            // Right
            if (target >= nums[mid] && target <= nums[end]) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }
    }

    return -1;
}

const nums = [4, 5, 6, 7, 0, 1, 2, 3];
const target = 0;

const result = searchInRotatedArray(nums, target);
console.log(result);
