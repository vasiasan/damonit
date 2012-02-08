#!/usr/bin/perl
print "Content-type: text/plain\r\n\r\n";
use strict;
use Socket;
# Создаем соктет
my ($remote, $port, $iaddr, $paddr, $proto, $i);
$remote  = shift || "localhost";
$port    = shift || 2345;
$iaddr   = inet_aton($remote)       || die "no host: $remote";
$paddr   = sockaddr_in($port, $iaddr);
$proto   = getprotobyname("tcp");
socket( Server, PF_INET, SOCK_STREAM, $proto)  || die "socket: $!";
# Подключамемся, возвращаем в вэб то, что пришло с сервера
connect ( Server, $paddr)               || die "connect: $!";
print Server "restart";
close Server                        || die "close: $!";
exit 0;
