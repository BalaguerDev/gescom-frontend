export const handleApiError = (error, context = "") => {
    console.error(`❌ API Error in ${context}:`, error.message);
    return { success: false, data: [], error: error.message };
};