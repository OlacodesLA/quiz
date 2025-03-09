"use client";

const ExamEndingLoader = () => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center space-y-6 p-8 bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <h2 className="text-2xl font-bold text-gray-900">Exam Time Up!</h2>
        </div>
        <div className="space-y-3">
          <p className="text-gray-600 font-medium">Submitting your exam...</p>
          <p className="text-red-500 font-semibold">
            Please do not close this window
          </p>
        </div>
        <div className="animate-pulse">
          <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default ExamEndingLoader;
