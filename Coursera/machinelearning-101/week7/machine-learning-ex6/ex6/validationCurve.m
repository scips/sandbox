
clear ; close all; clc

load('ex6data3.mat');


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

close all;
[x, y] = meshgrid(0:30,0:30);
surf(Z);

disp("bestError:"), disp(bestError);
disp("bestC:"), disp(bestC);
disp("bestSigma:"), disp(bestSigma);
