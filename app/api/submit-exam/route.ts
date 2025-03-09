import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { examData, userEmail, userName } = await request.json();

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NEXT_PUBLIC_INSTITUTE_EMAIL,
        pass: process.env.NEXT_PUBLIC_INSTITUTE_PASSWORD,
      },
    });

    // Calculate total correct answers
    let totalCorrectAnswers = 0;
    let totalObjectiveQuestions = 0;
    let totalTheoryQuestions = 0;

    examData.forEach((question: any) => {
      if (!question) return;

      if (question.correctAnswer) {
        totalObjectiveQuestions++;
        if (question.selectedAnswer === question.correctAnswer) {
          totalCorrectAnswers++;
        }
      } else {
        totalTheoryQuestions++;
      }
    });

    // Format exam data for email
    const formatExamDataForInstitute = (data: any[]) => {
      let formattedContent = "";

      data.forEach((question, index) => {
        if (!question) return;

        const isTheoryQuestion = !question.correctAnswer;

        if (isTheoryQuestion) {
          // Theory question format
          formattedContent += `
            <div style="margin-bottom: 20px; padding: 16px; border-radius: 8px; background-color: #f0f4f8; border: 1px solid #e0e0e0;">
              <p style="font-size: 16px; margin-bottom: 12px;"><strong style="color: #333;">Question ${
                question.id
              }:</strong> ${question.text}</p>
              <div style="background-color: #e6f7ff; padding: 12px; border-radius: 6px; border-left: 4px solid #1890ff;">
                <p style="font-size: 14px; margin: 0;"><strong>Theory Answer:</strong></p>
                <p style="font-size: 14px; margin: 8px 0 0 0; white-space: pre-line;">${
                  question.selectedAnswer || "Not answered"
                }</p>
              </div>
              <p style="font-size: 14px; text-align: right; margin: 8px 0 0 0; color: #5c6ac4; font-weight: bold;">Theory Question</p>
            </div>`;
        } else {
          // Objective question format
          const isCorrect = question.selectedAnswer === question.correctAnswer;
          const statusColor = isCorrect ? "#4CAF50" : "#F44336";
          const statusText = isCorrect ? "Correct" : "Incorrect";

          formattedContent += `
            <div style="margin-bottom: 20px; padding: 16px; border-radius: 8px; background-color: #f9f9f9; border: 1px solid #e0e0e0;">
              <p style="font-size: 16px; margin-bottom: 12px;"><strong style="color: #333;">Question ${question.id}:</strong> ${question.text}</p>
          `;

          if (question.options && Array.isArray(question.options)) {
            formattedContent += `<p style="font-size: 14px; color: #555; margin-bottom: 8px;"><strong>Options:</strong></p><ul style="margin-top: 5px; padding-left: 20px;">`;
            question.options.forEach((option: string) => {
              formattedContent += `<li style="margin-bottom: 5px;">${option}</li>`;
            });
            formattedContent += `</ul>`;
          }

          formattedContent += `<p style="font-size: 14px; margin-bottom: 8px;"><strong>Correct Answer:</strong> <span style="color: #4CAF50; font-weight: 500;">${question.correctAnswer}</span></p>`;
          formattedContent += `
            <p style="font-size: 14px; margin-bottom: 8px;"><strong>Selected Answer:</strong> <span style="color: ${statusColor}; font-weight: 500;">${
            question.selectedAnswer || "Not answered"
          }</span></p>
            <p style="font-size: 14px; text-align: right; margin: 0; color: ${statusColor}; font-weight: bold;">${statusText}</p>
          </div>`;
        }
      });

      return formattedContent;
    };

    // Format exam data for user email (without showing correct answers)
    const formatExamDataForUser = (data: any[]) => {
      let formattedContent = "";

      data.forEach((question, index) => {
        if (!question) return;

        const isTheoryQuestion = !question.correctAnswer;

        if (isTheoryQuestion) {
          // Theory question format
          formattedContent += `
            <div style="margin-bottom: 20px; padding: 16px; border-radius: 8px; background-color: #f0f4f8; border: 1px solid #e0e0e0;">
              <p style="font-size: 16px; margin-bottom: 12px;"><strong style="color: #333;">Question ${
                question.id
              }:</strong> ${question.text}</p>
              <div style="background-color: #e6f7ff; padding: 12px; border-radius: 6px; border-left: 4px solid #1890ff;">
                <p style="font-size: 14px; margin: 0;"><strong>Your Answer:</strong></p>
                <p style="font-size: 14px; margin: 8px 0 0 0; white-space: pre-line;">${
                  question.selectedAnswer || "Not answered"
                }</p>
              </div>
              <p style="font-size: 14px; text-align: right; margin: 8px 0 0 0; color: #5c6ac4; font-weight: bold;">Theory Question</p>
            </div>`;
        } else {
          // Objective question format
          formattedContent += `
            <div style="margin-bottom: 20px; padding: 16px; border-radius: 8px; background-color: #f9f9f9; border: 1px solid #e0e0e0;">
              <p style="font-size: 16px; margin-bottom: 12px;"><strong style="color: #333;">Question ${question.id}:</strong> ${question.text}</p>
          `;

          if (question.options && Array.isArray(question.options)) {
            formattedContent += `<p style="font-size: 14px; color: #555; margin-bottom: 8px;"><strong>Options:</strong></p><ul style="margin-top: 5px; padding-left: 20px;">`;
            question.options.forEach((option: string) => {
              formattedContent += `<li style="margin-bottom: 5px;">${option}</li>`;
            });
            formattedContent += `</ul>`;
          }

          formattedContent += `
            <p style="font-size: 14px; margin-bottom: 8px;"><strong>Your Answer:</strong> <span style="color: #1976D2; font-weight: 500;">${
              question.selectedAnswer || "Not answered"
            }</span></p>
          </div>`;
        }
      });

      return formattedContent;
    };

    // Send email to institute
    await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_INSTITUTE_EMAIL,
      to: process.env.NEXT_PUBLIC_INSTITUTE_EMAIL,
      subject: `Exam Submission from ${userName}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background-color: #ffffff;">
          <div style="background-color: #2c3e50; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Exam Submission</h1>
          </div>
          
          <div style="padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px; background-color: #f8f9fa;">
            <div style="background-color: #e3f2fd; padding: 15px; border-radius: 6px; margin-bottom: 25px; border-left: 4px solid #1976D2;">
              <h2 style="color: #1976D2; margin-top: 0; font-size: 18px;">Student Information</h2>
              <p style="margin: 5px 0; font-size: 15px;"><strong>Name:</strong> ${userName}</p>
              <p style="margin: 5px 0; font-size: 15px;"><strong>Email:</strong> ${userEmail}</p>
              <p style="margin: 5px 0; font-size: 15px;"><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="background-color: #f1f8e9; padding: 15px; border-radius: 6px; margin-bottom: 25px; border-left: 4px solid #8bc34a;">
              <h2 style="color: #558b2f; margin-top: 0; font-size: 18px;">Exam Summary</h2>
              <p style="margin: 5px 0; font-size: 15px;"><strong>Total Objective Questions:</strong> ${totalObjectiveQuestions}</p>
              <p style="margin: 5px 0; font-size: 15px;"><strong>Total Theory Questions:</strong> ${totalTheoryQuestions}</p>
              <p style="margin: 5px 0; font-size: 15px;"><strong>Correct Answers:</strong> <span style="color: #4CAF50; font-weight: bold;">${totalCorrectAnswers}</span> out of ${totalObjectiveQuestions}</p>
              <p style="margin: 5px 0; font-size: 15px;"><strong>Score:</strong> <span style="color: #4CAF50; font-weight: bold;">${
                totalObjectiveQuestions > 0
                  ? Math.round(
                      (totalCorrectAnswers / totalObjectiveQuestions) * 100
                    )
                  : 0
              }%</span></p>
            </div>
            
            <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; margin-top: 30px;">Exam Answers</h2>
            ${formatExamDataForInstitute(examData)}
            
            <div style="margin-top: 30px; padding: 15px; background-color: #f5f5f5; border-radius: 6px; font-size: 14px; color: #666;">
              <p style="margin: 0;">This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </div>
      `,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_INSTITUTE_EMAIL,
      to: userEmail,
      subject: "Exam Submission Confirmation",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto;  background-color: #ffffff;">
          <div style="background-color: #3498db; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Exam Submission Confirmation</h1>
          </div>
          
          <div style="padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px; background-color: #f8f9fa;">
            <div style="background-color: #e8f5e9; padding: 15px; border-radius: 6px; margin-bottom: 25px; border-left: 4px solid #4CAF50;">
              <h2 style="color: #2e7d32; margin-top: 0; font-size: 18px;">Submission Received</h2>
              <p style="margin: 5px 0; font-size: 15px;">Dear <strong>${userName}</strong>,</p>
              <p style="margin: 10px 0; font-size: 15px;">We have received your exam submission. Thank you!</p>
              <p style="margin: 5px 0; font-size: 15px;"><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="background-color: #fff8e1; padding: 15px; border-radius: 6px; margin-bottom: 25px; border-left: 4px solid #ffc107;">
              <h2 style="color: #ff8f00; margin-top: 0; font-size: 18px;">Exam Summary</h2>
              <p style="margin: 5px 0; font-size: 15px;"><strong>Total Objective Questions:</strong> ${totalObjectiveQuestions}</p>
              <p style="margin: 5px 0; font-size: 15px;"><strong>Total Theory Questions:</strong> ${totalTheoryQuestions}</p>
              <p style="margin: 5px 0; font-size: 15px;"><strong>Total Questions:</strong> ${
                totalObjectiveQuestions + totalTheoryQuestions
              }</p>
            </div>
            
            <p style="font-size: 15px; line-height: 1.5; color: #333;">Your answers have been recorded and will be reviewed by our team. You will receive your results once the evaluation is complete.</p>
            
            <div style="margin: 25px 0; padding: 15px; background-color: #fff3e0; border-radius: 6px; border-left: 4px solid #ff9800;">
              <p style="margin: 0; font-size: 15px; color: #e65100;">If you have any questions, please contact our support team at <a href="mailto:support@institute.edu" style="color: #0277bd; text-decoration: none;">support@institute.edu</a>.</p>
            </div>
            
            <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; margin-top: 30px;">Your Submitted Answers</h2>
            ${formatExamDataForUser(examData)}
            
            <div style="margin-top: 30px; padding: 15px; background-color: #f5f5f5; border-radius: 6px; font-size: 14px; color: #666; text-align: center;">
              <p style="margin: 0;">This is an automated message. Please do not reply to this email.</p>
              <p style="margin: 10px 0 0 0;">&copy; ${new Date().getFullYear()} Your Institute. All rights reserved.</p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Exam submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting exam:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit exam" },
      { status: 500 }
    );
  }
}
