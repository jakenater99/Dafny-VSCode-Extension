function gcd(a: int, b: int): int

method GCD2(a: int, b: int) returns (r: int)
    requires a >= 0 && b >= 0
    ensures r == gcd(a, b)
    decreases b
{
        //{(b == 0 ==> a == gcd(a, b)) && (b != 0 ==> b >= 0 && a % b >= 0 && gcd(b, a % b) == gcd(a, b)) }
    if b == 0 {
        //{ a == gcd(a, b) }
        r := a;
        //{ r == gcd(a, b) }
    } else {
        //{ b >= 0 && a % b >= 0 && gcd(b, a % b) == gcd(a, b) } one-point rule
        //{ b >= 0 && a % b >= 0 && forall r' :: r' == gcd(b, a % b) ==> r' == gcd(a, b) } *
        r := GCD2(b, a % b);
        //{ r == gcd(a, b) }
    }
        //{ r == gcd(a, b) }
}