function [C, sigma] = dataset3Params(X, y, Xval, yval)
%DATASET3PARAMS returns your choice of C and sigma for Part 3 of the exercise
%where you select the optimal (C, sigma) learning parameters to use for SVM
%with RBF kernel
%   [C, sigma] = DATASET3PARAMS(X, y, Xval, yval) returns your choice of C and
%   sigma. You should complete this function to return the optimal C and
%   sigma based on a cross-validation set.
%

% You need to return the following variables correctly.
C = 1;
sigma = 0.3;

% ====================== YOUR CODE HERE ======================
% Instructions: Fill in this function to return the optimal C and sigma
%               learning parameters found using the cross validation set.
%               You can use svmPredict to predict the labels on the cross
%               validation set. For example,
%                   predictions = svmPredict(model, Xval);
%               will return the predictions on the cross validation set.
%
%  Note: You can compute the prediction error using
%        mean(double(predictions ~= yval))
%

C_vect = [0.01, 0.03, 0.1, 0.3, 1, 3, 10, 30];
Sigma_vect = [0.01, 0.03, 0.1, 0.3, 1, 3, 10, 30];
Z = C_vect' * Sigma_vect;

totalElem = numel(Z);

bestC = -1;
bestSigma = -1;
bestError = 10000;
currentEl = 1;

for Ci = 1:size(C_vect)(2)
    for Sigmai = 1:size(Sigma_vect)(2)
        printf("Processing %d of %d elements", currentEl, totalElem);
        C = C_vect(Ci);
        sigma = Sigma_vect(Sigmai);
        model = svmTrain(X, y, C, @(x1, x2) gaussianKernel(x1, x2, sigma));
        predictions = svmPredict(model, Xval);
        error = mean(double(predictions ~= yval))
        if (error < bestError)
            bestError = error;
            bestC = C;
            bestSigma = sigma;
        endif
        Z(Ci, Sigmai) = error;
        currentEl++;
    endfor
endfor

C = bestC;
sigma = bestSigma;

% =========================================================================

end
