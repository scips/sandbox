class MergeSort
  constructor:()->
    @resumeOperation()

  resumeOperation:()->
    @operations = 0

  getOperations:()->
    return @operations

  sort:(toSortArray)->
    n = toSortArray.length
    if n <= 1
      return toSortArray
    splitSize = Math.ceil(n/2)
    A = toSortArray[0..(splitSize-1)]
    B = toSortArray[splitSize..(n-1)]
    sortedA = @sort A
    sortedB = @sort B
    i = 0
    @operations++
    j = 0
    @operations++
    C = [0..(n-1)]
    for k in [0..(n-1)]
      @operations++
      if sortedB[j] && sortedA[i]
        @operations++
        if sortedA[i]<sortedB[j]
          @operations++
          C[k] = sortedA[i]
          @operations++
          i++
          @operations++
        else
          C[k] = sortedB[j]
          @operations++
          j++
          @operations++
      else
        if sortedA[i]
          @operations++
          C[k] = sortedA[i]
          @operations++
          i++
          @operations++
        if sortedB[j]
          @operations++
          C[k] = sortedB[j]
          @operations++
          j++
          @operations++
    return C

  generateArray:(n)->
    C = []
    for i in [0..(n-1)]
      C.push(Math.floor(Math.random()*100))
    return C

sort = new MergeSort()

for n in [100000..100010]
  sort.resumeOperation()
  toSort = sort.generateArray(n)
  console.log "Sorting: #{n} size array"
  sorted = sort.sort(toSort)
  op = sort.getOperations()
  order =
    n: n
    'n log n': n*Math.log(n)
    'n^2': n*n
    'n^3': n*n*n
  for ord of order
    if op > order[ord]
      orderInfo = ord
  console.log "Sorted in #{sort.getOperations()} op (#{orderInfo}) (#{order['n']},#{order['n log n']},#{order['n^2']},#{order['n^3']})"
