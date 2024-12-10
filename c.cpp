#include <bits/stdc++.h>
using namespace std;
struct Point {
    int x, y;
};
void setio(string name = "") { 
    ios_base::sync_with_stdio();
	cin.tie(0);  
	cout.tie(0);
	if (!name.empty()) {
		freopen((name + ".inp").c_str(), "r", stdin); 
		//freopen((name + ".out").c_str(), "w", stdout);
	}
}

void readin(){
	
}

void solve(){
	
}

int main(){
	setio("vd");
	readin();
	solve();
	return 0;
}
/*CHECK TAM GIAC VUONG CAN THUONG VOI TOA DO 3 DIEM
#include <iostream>
#include <cmath>
#include <fstream>
using namespace std;
// Hàm tính b?nh phương kho?ng cách gi?a hai đi?m
double distanceSquared(int x1, int y1, int x2, int y2) {
    return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
}
// Hàm tính di?n tích tam giác theo t?a đ?
bool isCollinear(int xa, int ya, int xb, int yb, int xc, int yc) {
    return (xa * (yb - yc) + xb * (yc - ya) + xc * (ya - yb)) == 0;
}
int main() {
    ifstream infile("TGVCT.INP");
    ofstream outfile("TGVCT.OUT");
    // Đ?c d? li?u t? file
    int xa, ya, xb, yb, xc, yc;
    infile >> xa >> ya;
    infile >> xb >> yb;
    infile >> xc >> yc;
    // Ki?m tra ba đi?m có th?ng hàng không
    if (isCollinear(xa, ya, xb, yb, xc, yc)) {
        outfile << "NO";
        return 0;
    }
    // Tính b?nh phương đ? dài các c?nh
    double AB2 = distanceSquared(xa, ya, xb, yb);
    double BC2 = distanceSquared(xb, yb, xc, yc);
    double AC2 = distanceSquared(xa, ya, xc, yc);
    // Ki?m tra lo?i tam giác
    if (AB2 + BC2 == AC2 || AB2 + AC2 == BC2 || BC2 + AC2 == AB2) {
        outfile << "TGV"; // Tam giác vuông
    } else if (AB2 == BC2 || AB2 == AC2 || BC2 == AC2) {
        outfile << "TGC"; // Tam giác cân
    } else {
        outfile << "TGT"; // Tam giác thư?ng
    }
    return 0;
} 
*/
----------------------------------------------------
/*
BAI 01   DIEM NAM TRONG TAM GIAC //// DIEN TICH TAM GIAC 
double s(double x1, double y1, double x2, double y2, double x3, double y3) {
    return abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0;
}
int main() {
    freopen("BAI01.inp","w",stdin);
    freopen("BAI01.out","r",stdout);
    double xa, ya, xb, yb, xc, yc, xm, ym;
    cin >> xa >> ya;
    cin >> xb >> yb;
    cin >> xc >> yc;
    cin >> xm >> ym;
    double S_ABC = s(xa, ya, xb, yb, xc, yc);
    double S_AMB = s(xa, ya, xm, ym, xb, yb);
    double S_BMC = s(xb, yb, xm, ym, xc, yc);
    double S_AMC = s(xa, ya, xm, ym, xc, yc);
    double tongDienTich = S_AMB + S_BMC + S_AMC;
    cout << fixed << setprecision(2) << S_ABC << endl;
    if (abs(S_ABC - tongDienTich) < 1e-6) {
        cout << "TRONG" << endl;
    } else {
        cout << "NGOAI" << endl;
    }
    return 0;
}
*/
------------------------------------------------------
/*
twopointline
int main() {
    double A1, B1, C1, A2, B2, C2;
    cin >> A1 >> B1 >> C1;
    cin >> A2 >> B2 >> C2;
    double d = A1 * B2 - A2 * B1;
    double dx = C2 * B1 - C1 * B2;
    double dy = A2 * C1 - A1 * C2;
    if (d != 0) {
        // Có giao di?m
        double x = dx / d;
        double y = dy / d;
        cout << fixed << setprecision(2) << x << " " << y << endl;
    } else if (dx == 0 && dy == 0) {
        // Trùng nhau
        cout << "DUPLICATE" << endl;
    } else {
        // Song song
        cout << "PARALLEL" << endl;
    }
    return 0;
}
*/
------------------------------------------------
/* POINTLINE DISTANCE RIGHT LEFT  3 di?m thang hang 
 
void lines(Point P, Q, A,B,C){
	A = P.y-Q.y;
	B=Q.x - P .x;
	C = -(A*P.x + B*P.y) // C=X1Y2 - X2 Y1
}
void dist(Point A, B ){
return sqrt((B.x-A.x)*(B.x-A.x)+(B.y-A.y)*(B.y-A.y));
}
bool isCollinear(int x1, int y1, int x2, int y2, int x3, int y3) {   kiem tra 3 diem thang hang 
    // S? d?ng công th?c (X1 - X2) * (Y1 - Y3) = (X1 - X3) * (Y1 - Y2)
    return (x1 - x2) * (y1 - y3) == (x1 - x3) * (y1 - y2);
}
struct Point {
    double x, y;
};

// Hàm tính tích có hu?ng c?a 2 vector AB và AM
double crossProduct(Point A, Point B, Point M) {
    return (B.x - A.x) * (M.y - A.y) - (B.y - A.y) * (M.x - A.x);
}
// Hàm tính kho?ng cách t? di?m M d?n du?ng th?ng di qua A và B
double distanceToLine(Point A, Point B, Point M) {
    double numerator = abs((B.y - A.y) * M.x - (B.x - A.x) * M.y + B.x * A.y - B.y * A.x);
    double denominator = sqrt(pow(B.y - A.y, 2) + pow(B.x - A.x, 2));
    return numerator / denominator;
}
// Hàm ki?m tra v? trí c?a M và in ra k?t qu?
void checkPosition(Point A, Point B, Point M) {
    double cross = crossProduct(A, B, M); 
    if (cross == 0) {
        cout << "M n?m trên du?ng th?ng di qua A và B." << endl;
    } else if (cross > 0) {
        cout << "M n?m phía bên trái c?a du?ng th?ng." << endl;
    } else {
        cout << "M n?m phía bên ph?i c?a du?ng th?ng." << endl;
    }    
    double distance = distanceToLine(A, B, M);
    cout << "Kho?ng cách t? M d?n du?ng th?ng: " << distance << endl;
}
*/
-------------------------------------------------
/*
#include <iostream>
#include <cmath>
#include <fstream>
using namespace std;
// Hàm tính b?nh phương kho?ng cách gi?a hai đi?m
double distanceSquared(int x1, int y1, int x2, int y2) {
    return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
}
// Hàm tính di?n tích tam giác theo t?a đ?
bool isCollinear(int xa, int ya, int xb, int yb, int xc, int yc) {
    return (xa * (yb - yc) + xb * (yc - ya) + xc * (ya - yb)) == 0;
}
int main() {
    ifstream infile("TGVCT.INP");
    ofstream outfile("TGVCT.OUT");
    // Đ?c d? li?u t? file
    int xa, ya, xb, yb, xc, yc;
    infile >> xa >> ya;
    infile >> xb >> yb;
    infile >> xc >> yc;
    // Ki?m tra ba đi?m có th?ng hàng không
    if (isCollinear(xa, ya, xb, yb, xc, yc)) {
        outfile << "NO";
        return 0;
    }
    // Tính b?nh phương đ? dài các c?nh
    double AB2 = distanceSquared(xa, ya, xb, yb);
    double BC2 = distanceSquared(xb, yb, xc, yc);
    double AC2 = distanceSquared(xa, ya, xc, yc);
    // Ki?m tra lo?i tam giác
    if (AB2 + BC2 == AC2 || AB2 + AC2 == BC2 || BC2 + AC2 == AB2) {
        outfile << "TGV"; // Tam giác vuông
    } else if (AB2 == BC2 || AB2 == AC2 || BC2 == AC2) {
        outfile << "TGC"; // Tam giác cân
    } else {
        outfile << "TGT"; // Tam giác thư?ng
    }
    return 0;
}
*/
--------------------------------------
/*
int ccw(Point A, Point B, Point C)
{ double t=(B.x-A.x)*(C.y-A.y) - (B.y-A.y)*(C.x-A.x);
if (t>0) return 1; //quay trai
if (t<0) return -1; //quay phai
return 0; //thang hang
}
*/
--------------------------------------
/*
#Tích vô hu?ng (tích ch?m)
int tichvh(Point u, Point v)
{
return (u.x*v.x + u.y*v.y);
}
Tích chéo
int tichc(Point u, Point v)
{
return (u.x*v.y - u.y*v.x);
}
*/
------------------------------------------
/*
#Goc
double goc(Point A)
{
double t = atan2(A.y,A.x);
if (t<0) t = t + 2 * acos(-1);
return t;
}
*/
-----------------------------
/*
#S tam giac
double sTriangle(Point A, Point B, Point C)
{
double s=(B.x-A.x)*(C.y-A.y)-(B.y-A.y)*(C.x-A.x);
return abs(s/2);  #S := sqrt((p-a)*(p-b)*(p-c)*p);
}
#duong cao tam giac
double dist2(Point A, Point B, Point C)
{
return 2*sTriangle(A,B,C)/dist(A,B);
}
*/
----------------------------------------------
/*
Poliar
struct Point {
    int x, y;
};
int main() {
    // Khai báo các bi?n
    int N;
    cin >> N;
    vector<Point> points(N);
    // ??c t?a d? c?a các d?nh t? input
    for (int i = 0; i < N; ++i) {
        cin >> points[i].x >> points[i].y;
    }
    // Tính di?n tích b?ng công th?c Shoelace
    double area = 0.0;
    for (int i = 0; i < N; ++i) {
        int j = (i + 1) % N;  // Ch? s? d?nh ti?p theo, quay v?ng
        area += points[i].x * points[j].y - points[i].y * points[j].x;
    }
    // Di?n tích tuy?t d?i và chia dôi
    area = abs(area) / 2.0;
    // In di?n tích ra màn h?nh, làm tr?n d?n 2 ch? s? th?p phân
    cout << fixed << setprecision(2) << area << endl;
    return 0;
}
*/
----------------------------------------------------------------
/*
#include <bits/stdc++.h>
using namespace std;
const long long MOD = 1e9;
const long long mx = 1e3 + 1;
const long long inf = 1e18;
long long n,k,a[mx][mx],f[mx][mx];
void read() {
	cin >> k >> n;
	for (int i=1;i<=k;i++) {
		for (int j=1;j<=n;j++) {
			cin >> a[i][j];
			
			if (i == 1) {
				f[i][j] = max(a[i][j], f[i][j - 1]);
			}
			
			if (j < i)
				f[i][j] = -1;
		}
	}
}
void solve() {
	for (int i=2;i<=k;i++) {
		for(int j=i;j<=n - k + i;j++) {
			f[i][j] = max(f[i][j - 1], f[i - 1][j -1] + a[i][j]);
		}
	}
}
void debug() {
	cout<<endl;
	for (int i=1;i<=k;i++) {
		for (int j=1;j<=n;j++)
			cout<<f[i][j]<<" ";
		cout<<endl;
	}
}
int main() {
	ios_base::sync_with_stdio(0);cin.tie(0);cout.tie(0);
    freopen("xeplich.inp","r",stdin);
    freopen("xeplich.out","w",stdout);
	read();
	solve();
	cout<<f[k][n];
}

*/
----------------------------------------
/* Trapezium
 
#include <bits/stdc++.h>
using namespace std;

void setIO(string name = "") { 
    ios_base::sync_with_stdio();
	cin.tie(0);  cout.tie(0);
	if (!name.empty()) {
		freopen((name + ".inp").c_str(), "r", stdin); 
		freopen((name + ".out").c_str(), "w", stdout);
	}
}

double calculateArea(double a, double b, double c, double d) {
    double s = (b + d + abs(c - a)) / 2.0; 
    double h = (2.0 / abs(c - a)) * sqrt(s * (s - b) * (s - d) * (s - abs(c - a))); 
    return ((a + c) * h) / 2.0; 
}

int main() {
	setIO("Trapezium"); 
	
    int T;
    cin >> T;
    for (int i = 1; i <= T; i++) {
        double a, b, c, d;
        cin >> a >> b >> c >> d;

        double area = calculateArea(a, b, c, d);

        cout << fixed << setprecision(7);
        cout << "Case " << i << ": " << area << endl;
    }
    return 0;
}

*/
-----------------------------------------
/*
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    // Đ?c d? li?u t? file
    freopen("CAPTOC.INP", "r", stdin);
    freopen("CAPTOC.OUT", "w", stdout);
    int N, X;
    cin >> N >> X;
    vector<vector<int>> A(N, vector<int>(X));
    for (int i = 0; i < N; ++i) {
        for (int j = 0; j < X; ++j) {
            cin >> A[i][j];
        }
    }
    // Kh?i t?o m?ng dp
    vector<int> dp(X + 1, 0);
    // Quy ho?ch đ?ng
    for (int i = 0; i < N; ++i) {
        for (int d = X; d >= 0; --d) {
            for (int j = 1; j <= X; ++j) {
                if (d >= j) {
                    dp[d] = max(dp[d], dp[d - j] + A[i][j - 1]);
                }
            }
        }
    }
    // In k?t qu?
    cout << dp[X] << endl;
    return 0;
}
*/
------------------------------------------
/*  BST1 
#include<bits/stdc++.h>
using namespace std;
struct Point {
    double x, y;
};
int di(Point A, Point B) {
    return (A.x - B.x) * (A.x - B.x) + (A.y - B.y) * (A.y - B.y);
}
int main() {
    freopen("BTS1.INP", "r", stdin);
    freopen("BTS1.OUT", "w", stdout);
    Point a, b; 
    int r, n, dem = 0;
    cin >> a.x >> a.y >> r >> n; 
    for (int i = 1; i <= n; i++) {
        cin >> b.x >> b.y;

        if (di(a, b) > r * r) {
            dem++;
        }
    } 
    cout << dem;
    return 0;
}
*/

/*
#include <bits/stdc++.h>

    using namespace std;

    // Hàm so sánh đ? s?p x?p các c?p giá tr? theo quy t?c c?a thu?t toán Johnson
    bool cmp(pair<int,int> A,pair<int,int> B) {
        return A.second > B.second;
    }
    
    int main() {
        int n;
        cin >> n;
    
        vector<pair<int, int>> a;
        vector<pair<int, int>> b;
    
        for(int i = 0; i < n; i++) {
            int ai, bi;
            cin >> ai >> bi;
            if(ai <= bi) a.push_back({ai, bi});
            else b.push_back({ai, bi});
        }
    
        // S?p x?p các công vi?c theo yêu c?u c?a thu?t toán Johnson
        sort(a.begin(), a.end());
        sort(b.begin(), b.end(), cmp);
    
        // K?t h?p l?i thành m?t l?ch tr?nh
        vector<pair<int, int>> schedule = a;
        for(auto &p : b) schedule.push_back(p);
    
        int total_time = 0;
        int time_a = 0, time_b = 0;
    
        // Tính toán th?i gian hoàn thành s?n ph?m
        for(auto &job : schedule) {
            time_a += job.first;
            time_b = max(time_b, time_a) + job.second;
        }
    
        total_time = time_b;
    
        cout << total_time << endl;
    
        return 0;
    }
    
*/
