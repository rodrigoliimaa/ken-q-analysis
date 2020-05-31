/*
             *  @fileoverview Pearson correlation score algorithm.
             *  @author matt.west@kojilabs.com (Matt West)
             *  @license Copyright 2013 Matt West.
             *  Licensed under MIT (http://opensource.org/licenses/MIT).
             */

import evenRound from "../../Utils/evenRound";
import Spearman from "spearman-rho";

// import NP from "number-precision";

export function getPqmethodCorrelation(x, y) {
  var n = x.length;

  if (n === 0) {
    return 0;
  }

  var sum1 = 0;
  for (var i = 0; i < n; i++) {
    sum1 += x[i];
  }

  var sum2 = 0;
  for (var j = 0; j < n; j++) {
    sum2 += y[j];
  }

  var sum1Sq = 0;
  for (var k = 0; k < n; k++) {
    sum1Sq += Math.pow(x[k], 2);
  }

  var sum2Sq = 0;
  for (var m = 0; m < n; m++) {
    sum2Sq += Math.pow(y[m], 2);
  }

  var pSum = 0;
  for (var p = 0; p < n; p++) {
    pSum += x[p] * y[p];
  }

  var num = pSum - (sum1 * sum2) / n;
  var den = Math.sqrt(
    (sum1Sq - Math.pow(sum1, 2) / n) * (sum2Sq - Math.pow(sum2, 2) / n)
  );

  if (den === 0) {
    return 0;
  }

  var answer = num / den;

  var answer1 = [evenRound(answer, 5), evenRound(answer * 100, 0)];

  return answer1;
}

export async function getPqmethodCorrelationSpearman(x, y) {
  const spearman = new Spearman(x, y);

  var value =  await spearman.calc();
  var answer1 = [evenRound(value, 5), evenRound(value * 100, 0)];
  
  return answer1;
}
