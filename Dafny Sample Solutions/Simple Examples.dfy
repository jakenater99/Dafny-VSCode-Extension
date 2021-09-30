
method example(a: int, b: int) 
{
    var c := true;
    var x,y := 0,0;
    assert(x >= 0 && c ==> true);
    assert(x >= -11);
    assert(x + 1 >= -10);
    x := x + 1;
    assert(x >= -10);
    assert y == 1;
    y := 0;
    assert(x >= -10);
}