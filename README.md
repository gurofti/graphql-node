### Dev Dependencies

yarn add @babel/core @babel/node @babel/preset-env nodemon -D

@babel/core: Bu çekirdek kitaplıktır
@babel/node: Bu, kodumuzu babel-nodegeleneksel komut yerine komutu kullanarak çalıştırmamıza izin verecektir node.
@babel/preset-env: Ve son olarak, bu, dile yapılan en son eklemeleri içeren bir ön ayardır, bu nedenle manuel olarak yeni sözdizimi eklemek için endişelenmenize gerek yok

### Dependencies

yarn add express apollo-server-express graphql @graphql-tools/schema dotenv

ekspres: Minimalist bir HTTP sunucusudur, ancak muhtemelen bunu zaten biliyorsunuzdur. Bunu kullanıyoruz çünkü güven bana. Uygulamanızda graphql tarafından ele alınmaması gereken şeyleri elde etmek yararlıdır. Genellikle, sağlık kontrolleri veya kimlik doğrulama gibi veri erişimi yerine uç noktaları başka amaçlar için kullanıma sunmanız gerekir.
apollo-server-express: Express kullandığımız için, Apollo'nun ekspres uyumlu sürümünün kullanılması gerekiyor.
graphql: Doğrudan uygulamamızda kullanılmasa da, birkaç kütüphanenin eş bağımlılığıdır, bu yüzden eklemeniz gerekir.
@graphql-tools/schema: Bunu şemamızı oluşturmak ve derlemek için kullanacağız
dotenv: Uygulamanızı farklı ortamlarda çalışmaya uygun hale getirmek için ortam değişkenleri eklemek isteyebilirsiniz. Onları bu bağımlılığı kullanarak okuyacağız

### Typedef - Schema

Modellenecek varlıklarımızın her biri için bir ve a ile birlikte bir .graphql dosyamız olduğunu göreceksiniz common.graphql. index.graphqlKök Tanımlarımızı (Sorgu ve Mutasyon olarak okunur) ve diğerlerini belirli varlıkla ilgili türler için tutmak için kullanacağız . Genel common.graphqlamaçlı tipler içindir.

Not: Skaleri fark edeceksiniz Date. Bu, yerel bir graphql türü olmadığı için bildirilmelidir, ancak @graphql araçlarına dahil edilmiştir ve yalnızca bu bildirimle çalışır.

### Resolvers

Bu noktada typedef'lerimizi tamamladık, ancak bu typedef'leri çözümleyici işlevlerini kullanarak verilerle doldurmamız gerekiyor. Bunlar, resolvers çözümlemekte olduğumuz varlığın adının bir alt klasöründeki klasörün içinde oluşturulacak.

#

Parent: Bu önceki çözümleyicinin sonucudur, ana çözümleyicilerde bunu genellikle göz ardı ederiz çünkü önceki çözümleyici Sorgu/Mutasyon tanımıdır ve ilk düzeyde işe yaramaz. Ama diyelim ki Kitap içinde sahip olduğu “kardeş” (aynı yazarlı kitap) sayısını hesaplamak için bir çözümleyici oluşturmanız gerekiyor. Pekala, o alt çözücü için kitabın kendisini bu parametrede alacaksınız. Orada, isteği veya istediğiniz herhangi bir şeyi yerine getirmek için başka bir veritabanı sorgusu oluşturmak için kullanabilirsiniz.
Arguments: İstemciden çözümleyicinize sağladığınız argümanların listesi burada, açıkçası, bunları sağlanan parametrelere veya başka bir şeye dayalı bir sorgu oluşturmak için kullanabilirsiniz.
Context: Context, çözümleyicileriniz boyunca seyahat eden bir uzay gemisi gibidir, kimlik doğrulama veya bizim durumumuzda, sonraki makalede göreceğimiz veri toplayıcılar gibi kullanmanız için önemli olabilecek verileri taşır.

#

<img src="/git_assets/git_images.png" />

Klasörlerin her birinin aynı yapıya sahip olduğunu göreceksiniz ve bu nedenle:

index.js: Gelecekte bu tek varlığı çözmek için kod eklemek için bu dosyayı kullanacağız. Sorgularımızı optimize ettiğimizde bunu faydalı bulabilirsiniz. Şimdilik, yalnızca mutasyonlardan ve sorgu dosyalarından varsayılan dışa aktarmaları ortaya çıkaracaktır.
mutasyons.js: Mutasyonları çözen her fonksiyonu buraya koyacağız
query.js: Sorguları çözen her işlevi buraya koyacağız

### Mongoose

yarn add mongoose
