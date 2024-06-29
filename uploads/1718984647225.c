#include<stdio.h>
#include<conio.h>
void concatenate(char *str1,char *str2){
    while(*str1){
        str1++;
    }
    while(*str2){
        *str1=*str2;
        str1++;
        str2++;

    }
    *str1='\0';
}
void main(){
char a[50]="hello";
char b[50]="world";
concatenate(a,b);
printf("%s",a);

}

