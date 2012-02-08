#!/usr/bin/perl
print "Content-type: text/plain\r\n\r\n";
use strict;
use Socket;
use DBI;
my $h = 'localhost';
my $n = 'snmpdb';
my $u = 'thief';
my $p = '1qaz2wsx';
# Почучаем принятый идентификатор группы
my $group = (split /=/, (split /&/, $ENV{'QUERY_STRING'})[0])[1];
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
my @state = split / /, <Server>;
my %state;
# Превращаем массив в хэш для удобства
for (my $i = 0; $i < scalar @state - 1; $i += 2) {
	$state{$state[$i]} = $state[$i+1];
}
# Запрашиваем те устройства, которые находятся в запрашиваемой группе
my $connection = DBI->connect("dbi:Pg:dbname=$n;host=$h;", $u, $p);
my $p = $connection->prepare("SELECT device FROM group_divice_link WHERE \"group\" = '$group'");
my @response;
# Заносим в массив ответа статус устройств, принадлежащих группе
if (defined $p->execute()) {
	for ( my $i = 0; my @row = $p->fetchrow_array(); $i += 2 ) {
		$response[$i] = shift @row;
		$response[$i+1] = $state{$response[$i]};
	}
}
print "@response";
close Server                        || die "close: $!";
exit 0;
