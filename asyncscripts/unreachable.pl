#!/usr/bin/perl
print "Content-type: text/plain\r\n\r\n";
use strict;
use Socket;
# Создаем соктет
my ($remote, $port, $iaddr, $paddr, $proto, $i);
$remote  = shift || "localhost";
$port    = shift || 2346;
$iaddr   = inet_aton($remote)       || die "no host: $remote";
$paddr   = sockaddr_in($port, $iaddr);
$proto   = getprotobyname("tcp");
socket( Server, PF_INET, SOCK_STREAM, $proto)  || die "socket: $!";
# Подключамемся, возвращаем в вэб то, что пришло с сервера
connect ( Server, $paddr)               || die "connect: $!";
my @state = <Server>;
my @unreach;
# Сокращаем массив только до "отвалившихся устройств"
for ($i = 0; $i < scalar @state; $i++) {
	if ($state[$i+1] == 0) {
		push @unreach, $state[$i];
		push @unreach, $state[$i+1];
	}
}
print "@unreach";
close Server                        || die "close: $!";
exit 0;
