const calculateTimeSpan = (createdAt) => {
    const createdDate = new Date(createdAt);
    const now = new Date();

    const diffMs = now - createdDate; // Difference in milliseconds
    const diffSec = Math.floor(diffMs / 1000); // Convert to seconds
    const diffMin = Math.floor(diffSec / 60); // Convert to minutes
    const diffHours = Math.floor(diffMin / 60); // Convert to hours
    const diffDays = Math.floor(diffHours / 24); // Convert to days

    if (diffDays > 0) return `${diffDays} day(s) ago`;
    if (diffHours > 0) return `${diffHours} hour(s) ago`;
    if (diffMin > 0) return `${diffMin} minute(s) ago`;
    return `${diffSec} second(s) ago`;
};

module.exports = { calculateTimeSpan};