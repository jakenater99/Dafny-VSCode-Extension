function gcd(a: int, b: int): int

method GCD1(a: int, b: int) returns (r: int)
    requires a > 0 && b > 0
    ensures r == gcd(a, b)
    decreases b // note that a % b < b
{
        //{ b > 0 && a > 0 && (a % b == 0 ==> b == gcd(a, b)) && (a % b != 0 ==> a % b > 0 && gcd(b, a % b) == gcd(a, b)) } //strengthening
        //{ (a < b ==> b > 0 && a > 0) && (a >= b ==> (a % b == 0 ==> b == gcd(a, b)) && (a % b != 0 ==> b > 0 && a % b > 0 && gcd(b, a % b) == gcd(a, b)) }
    if a < b {
        //{ b > 0 && a > 0 } 
        //{ b > 0 && a > 0 && gcd(b, a) == gcd(a, b) } //one-point rule
        //{ b > 0 && a > 0 && forall r' :: r' == gcd(b, a) ==> r' == gcd(a, b) }
        r := GCD1(b, a);
        // { r == gcd(a, b) }
    } else {   
        //{ (a % b == 0 ==> b == gcd(a, b)) && (a % b != 0 ==> b > 0 && a % b > 0 && gcd(b, a % b) == gcd(a, b))} }
        if (a % b == 0) {
            //{ b == gcd(a, b) }
            r := b;
            //{ r == gcd(a, b) }
        } else {
            //{ b > 0 && a % b > 0 && gcd(b, a % b) == gcd(a, b) } //one-point rule
            //{ b > 0 && a % b > 0 && forall r' :: r' == gcd(b, a % b) ==> r' == gcd(a, b) }
            r := GCD1(b, a % b);
            //{ r == gcd(a, b) }
        }
            //{ r == gcd(a, b)) };
    }
}