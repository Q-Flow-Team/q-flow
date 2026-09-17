
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Counter
 * 
 */
export type Counter = $Result.DefaultSelection<Prisma.$CounterPayload>
/**
 * Model Ticket
 * 
 */
export type Ticket = $Result.DefaultSelection<Prisma.$TicketPayload>
/**
 * Model NotificationLog
 * 
 */
export type NotificationLog = $Result.DefaultSelection<Prisma.$NotificationLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  COUNTER_STAFF: 'COUNTER_STAFF'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const TicketStatus: {
  WAITING: 'WAITING',
  CALLED: 'CALLED',
  IN_SERVICE: 'IN_SERVICE',
  SERVED: 'SERVED',
  SKIPPED: 'SKIPPED',
  CANCELLED: 'CANCELLED',
  AUTO_CANCELLED: 'AUTO_CANCELLED'
};

export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus]


export const NotificationChannel: {
  WHATSAPP: 'WHATSAPP',
  SMS: 'SMS',
  NONE: 'NONE'
};

export type NotificationChannel = (typeof NotificationChannel)[keyof typeof NotificationChannel]


export const NotificationTrigger: {
  INITIAL_JOIN: 'INITIAL_JOIN',
  THRESHOLD_ALERT: 'THRESHOLD_ALERT',
  COUNTER_CALL: 'COUNTER_CALL',
  AUTO_CANCELLED: 'AUTO_CANCELLED'
};

export type NotificationTrigger = (typeof NotificationTrigger)[keyof typeof NotificationTrigger]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type TicketStatus = $Enums.TicketStatus

export const TicketStatus: typeof $Enums.TicketStatus

export type NotificationChannel = $Enums.NotificationChannel

export const NotificationChannel: typeof $Enums.NotificationChannel

export type NotificationTrigger = $Enums.NotificationTrigger

export const NotificationTrigger: typeof $Enums.NotificationTrigger

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.counter`: Exposes CRUD operations for the **Counter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Counters
    * const counters = await prisma.counter.findMany()
    * ```
    */
  get counter(): Prisma.CounterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ticket`: Exposes CRUD operations for the **Ticket** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tickets
    * const tickets = await prisma.ticket.findMany()
    * ```
    */
  get ticket(): Prisma.TicketDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notificationLog`: Exposes CRUD operations for the **NotificationLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NotificationLogs
    * const notificationLogs = await prisma.notificationLog.findMany()
    * ```
    */
  get notificationLog(): Prisma.NotificationLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Counter: 'Counter',
    Ticket: 'Ticket',
    NotificationLog: 'NotificationLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "counter" | "ticket" | "notificationLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Counter: {
        payload: Prisma.$CounterPayload<ExtArgs>
        fields: Prisma.CounterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CounterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CounterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterPayload>
          }
          findFirst: {
            args: Prisma.CounterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CounterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterPayload>
          }
          findMany: {
            args: Prisma.CounterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterPayload>[]
          }
          create: {
            args: Prisma.CounterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterPayload>
          }
          createMany: {
            args: Prisma.CounterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CounterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterPayload>[]
          }
          delete: {
            args: Prisma.CounterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterPayload>
          }
          update: {
            args: Prisma.CounterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterPayload>
          }
          deleteMany: {
            args: Prisma.CounterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CounterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CounterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterPayload>[]
          }
          upsert: {
            args: Prisma.CounterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterPayload>
          }
          aggregate: {
            args: Prisma.CounterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCounter>
          }
          groupBy: {
            args: Prisma.CounterGroupByArgs<ExtArgs>
            result: $Utils.Optional<CounterGroupByOutputType>[]
          }
          count: {
            args: Prisma.CounterCountArgs<ExtArgs>
            result: $Utils.Optional<CounterCountAggregateOutputType> | number
          }
        }
      }
      Ticket: {
        payload: Prisma.$TicketPayload<ExtArgs>
        fields: Prisma.TicketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TicketFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TicketFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          findFirst: {
            args: Prisma.TicketFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TicketFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          findMany: {
            args: Prisma.TicketFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>[]
          }
          create: {
            args: Prisma.TicketCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          createMany: {
            args: Prisma.TicketCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TicketCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>[]
          }
          delete: {
            args: Prisma.TicketDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          update: {
            args: Prisma.TicketUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          deleteMany: {
            args: Prisma.TicketDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TicketUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TicketUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>[]
          }
          upsert: {
            args: Prisma.TicketUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          aggregate: {
            args: Prisma.TicketAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTicket>
          }
          groupBy: {
            args: Prisma.TicketGroupByArgs<ExtArgs>
            result: $Utils.Optional<TicketGroupByOutputType>[]
          }
          count: {
            args: Prisma.TicketCountArgs<ExtArgs>
            result: $Utils.Optional<TicketCountAggregateOutputType> | number
          }
        }
      }
      NotificationLog: {
        payload: Prisma.$NotificationLogPayload<ExtArgs>
        fields: Prisma.NotificationLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>
          }
          findFirst: {
            args: Prisma.NotificationLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>
          }
          findMany: {
            args: Prisma.NotificationLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>[]
          }
          create: {
            args: Prisma.NotificationLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>
          }
          createMany: {
            args: Prisma.NotificationLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>[]
          }
          delete: {
            args: Prisma.NotificationLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>
          }
          update: {
            args: Prisma.NotificationLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>
          }
          deleteMany: {
            args: Prisma.NotificationLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>[]
          }
          upsert: {
            args: Prisma.NotificationLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>
          }
          aggregate: {
            args: Prisma.NotificationLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotificationLog>
          }
          groupBy: {
            args: Prisma.NotificationLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationLogCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    counter?: CounterOmit
    ticket?: TicketOmit
    notificationLog?: NotificationLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    servicedTickets: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    servicedTickets?: boolean | UserCountOutputTypeCountServicedTicketsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountServicedTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
  }


  /**
   * Count Type CounterCountOutputType
   */

  export type CounterCountOutputType = {
    tickets: number
  }

  export type CounterCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tickets?: boolean | CounterCountOutputTypeCountTicketsArgs
  }

  // Custom InputTypes
  /**
   * CounterCountOutputType without action
   */
  export type CounterCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CounterCountOutputType
     */
    select?: CounterCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CounterCountOutputType without action
   */
  export type CounterCountOutputTypeCountTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
  }


  /**
   * Count Type TicketCountOutputType
   */

  export type TicketCountOutputType = {
    notificationLogs: number
  }

  export type TicketCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notificationLogs?: boolean | TicketCountOutputTypeCountNotificationLogsArgs
  }

  // Custom InputTypes
  /**
   * TicketCountOutputType without action
   */
  export type TicketCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketCountOutputType
     */
    select?: TicketCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TicketCountOutputType without action
   */
  export type TicketCountOutputTypeCountNotificationLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    employeeId: string | null
    fullName: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    employeeId: string | null
    fullName: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    employeeId: number
    fullName: number
    passwordHash: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    employeeId?: true
    fullName?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    employeeId?: true
    fullName?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    employeeId?: true
    fullName?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    employeeId: string
    fullName: string
    passwordHash: string
    role: $Enums.UserRole
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    fullName?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    activeCounter?: boolean | User$activeCounterArgs<ExtArgs>
    servicedTickets?: boolean | User$servicedTicketsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    fullName?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    fullName?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    employeeId?: boolean
    fullName?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employeeId" | "fullName" | "passwordHash" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activeCounter?: boolean | User$activeCounterArgs<ExtArgs>
    servicedTickets?: boolean | User$servicedTicketsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      activeCounter: Prisma.$CounterPayload<ExtArgs> | null
      servicedTickets: Prisma.$TicketPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employeeId: string
      fullName: string
      passwordHash: string
      role: $Enums.UserRole
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    activeCounter<T extends User$activeCounterArgs<ExtArgs> = {}>(args?: Subset<T, User$activeCounterArgs<ExtArgs>>): Prisma__CounterClient<$Result.GetResult<Prisma.$CounterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    servicedTickets<T extends User$servicedTicketsArgs<ExtArgs> = {}>(args?: Subset<T, User$servicedTicketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly employeeId: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.activeCounter
   */
  export type User$activeCounterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CounterInclude<ExtArgs> | null
    where?: CounterWhereInput
  }

  /**
   * User.servicedTickets
   */
  export type User$servicedTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    cursor?: TicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Counter
   */

  export type AggregateCounter = {
    _count: CounterCountAggregateOutputType | null
    _avg: CounterAvgAggregateOutputType | null
    _sum: CounterSumAggregateOutputType | null
    _min: CounterMinAggregateOutputType | null
    _max: CounterMaxAggregateOutputType | null
  }

  export type CounterAvgAggregateOutputType = {
    counterNumber: number | null
  }

  export type CounterSumAggregateOutputType = {
    counterNumber: number | null
  }

  export type CounterMinAggregateOutputType = {
    id: string | null
    counterNumber: number | null
    counterName: string | null
    isActive: boolean | null
    updatedAt: Date | null
    currentStaffId: string | null
  }

  export type CounterMaxAggregateOutputType = {
    id: string | null
    counterNumber: number | null
    counterName: string | null
    isActive: boolean | null
    updatedAt: Date | null
    currentStaffId: string | null
  }

  export type CounterCountAggregateOutputType = {
    id: number
    counterNumber: number
    counterName: number
    isActive: number
    updatedAt: number
    currentStaffId: number
    _all: number
  }


  export type CounterAvgAggregateInputType = {
    counterNumber?: true
  }

  export type CounterSumAggregateInputType = {
    counterNumber?: true
  }

  export type CounterMinAggregateInputType = {
    id?: true
    counterNumber?: true
    counterName?: true
    isActive?: true
    updatedAt?: true
    currentStaffId?: true
  }

  export type CounterMaxAggregateInputType = {
    id?: true
    counterNumber?: true
    counterName?: true
    isActive?: true
    updatedAt?: true
    currentStaffId?: true
  }

  export type CounterCountAggregateInputType = {
    id?: true
    counterNumber?: true
    counterName?: true
    isActive?: true
    updatedAt?: true
    currentStaffId?: true
    _all?: true
  }

  export type CounterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Counter to aggregate.
     */
    where?: CounterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Counters to fetch.
     */
    orderBy?: CounterOrderByWithRelationInput | CounterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CounterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Counters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Counters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Counters
    **/
    _count?: true | CounterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CounterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CounterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CounterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CounterMaxAggregateInputType
  }

  export type GetCounterAggregateType<T extends CounterAggregateArgs> = {
        [P in keyof T & keyof AggregateCounter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCounter[P]>
      : GetScalarType<T[P], AggregateCounter[P]>
  }




  export type CounterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CounterWhereInput
    orderBy?: CounterOrderByWithAggregationInput | CounterOrderByWithAggregationInput[]
    by: CounterScalarFieldEnum[] | CounterScalarFieldEnum
    having?: CounterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CounterCountAggregateInputType | true
    _avg?: CounterAvgAggregateInputType
    _sum?: CounterSumAggregateInputType
    _min?: CounterMinAggregateInputType
    _max?: CounterMaxAggregateInputType
  }

  export type CounterGroupByOutputType = {
    id: string
    counterNumber: number
    counterName: string
    isActive: boolean
    updatedAt: Date
    currentStaffId: string | null
    _count: CounterCountAggregateOutputType | null
    _avg: CounterAvgAggregateOutputType | null
    _sum: CounterSumAggregateOutputType | null
    _min: CounterMinAggregateOutputType | null
    _max: CounterMaxAggregateOutputType | null
  }

  type GetCounterGroupByPayload<T extends CounterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CounterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CounterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CounterGroupByOutputType[P]>
            : GetScalarType<T[P], CounterGroupByOutputType[P]>
        }
      >
    >


  export type CounterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    counterNumber?: boolean
    counterName?: boolean
    isActive?: boolean
    updatedAt?: boolean
    currentStaffId?: boolean
    currentStaff?: boolean | Counter$currentStaffArgs<ExtArgs>
    tickets?: boolean | Counter$ticketsArgs<ExtArgs>
    _count?: boolean | CounterCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["counter"]>

  export type CounterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    counterNumber?: boolean
    counterName?: boolean
    isActive?: boolean
    updatedAt?: boolean
    currentStaffId?: boolean
    currentStaff?: boolean | Counter$currentStaffArgs<ExtArgs>
  }, ExtArgs["result"]["counter"]>

  export type CounterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    counterNumber?: boolean
    counterName?: boolean
    isActive?: boolean
    updatedAt?: boolean
    currentStaffId?: boolean
    currentStaff?: boolean | Counter$currentStaffArgs<ExtArgs>
  }, ExtArgs["result"]["counter"]>

  export type CounterSelectScalar = {
    id?: boolean
    counterNumber?: boolean
    counterName?: boolean
    isActive?: boolean
    updatedAt?: boolean
    currentStaffId?: boolean
  }

  export type CounterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "counterNumber" | "counterName" | "isActive" | "updatedAt" | "currentStaffId", ExtArgs["result"]["counter"]>
  export type CounterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    currentStaff?: boolean | Counter$currentStaffArgs<ExtArgs>
    tickets?: boolean | Counter$ticketsArgs<ExtArgs>
    _count?: boolean | CounterCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CounterIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    currentStaff?: boolean | Counter$currentStaffArgs<ExtArgs>
  }
  export type CounterIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    currentStaff?: boolean | Counter$currentStaffArgs<ExtArgs>
  }

  export type $CounterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Counter"
    objects: {
      currentStaff: Prisma.$UserPayload<ExtArgs> | null
      tickets: Prisma.$TicketPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      counterNumber: number
      counterName: string
      isActive: boolean
      updatedAt: Date
      currentStaffId: string | null
    }, ExtArgs["result"]["counter"]>
    composites: {}
  }

  type CounterGetPayload<S extends boolean | null | undefined | CounterDefaultArgs> = $Result.GetResult<Prisma.$CounterPayload, S>

  type CounterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CounterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CounterCountAggregateInputType | true
    }

  export interface CounterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Counter'], meta: { name: 'Counter' } }
    /**
     * Find zero or one Counter that matches the filter.
     * @param {CounterFindUniqueArgs} args - Arguments to find a Counter
     * @example
     * // Get one Counter
     * const counter = await prisma.counter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CounterFindUniqueArgs>(args: SelectSubset<T, CounterFindUniqueArgs<ExtArgs>>): Prisma__CounterClient<$Result.GetResult<Prisma.$CounterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Counter that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CounterFindUniqueOrThrowArgs} args - Arguments to find a Counter
     * @example
     * // Get one Counter
     * const counter = await prisma.counter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CounterFindUniqueOrThrowArgs>(args: SelectSubset<T, CounterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CounterClient<$Result.GetResult<Prisma.$CounterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Counter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CounterFindFirstArgs} args - Arguments to find a Counter
     * @example
     * // Get one Counter
     * const counter = await prisma.counter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CounterFindFirstArgs>(args?: SelectSubset<T, CounterFindFirstArgs<ExtArgs>>): Prisma__CounterClient<$Result.GetResult<Prisma.$CounterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Counter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CounterFindFirstOrThrowArgs} args - Arguments to find a Counter
     * @example
     * // Get one Counter
     * const counter = await prisma.counter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CounterFindFirstOrThrowArgs>(args?: SelectSubset<T, CounterFindFirstOrThrowArgs<ExtArgs>>): Prisma__CounterClient<$Result.GetResult<Prisma.$CounterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Counters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CounterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Counters
     * const counters = await prisma.counter.findMany()
     * 
     * // Get first 10 Counters
     * const counters = await prisma.counter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const counterWithIdOnly = await prisma.counter.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CounterFindManyArgs>(args?: SelectSubset<T, CounterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CounterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Counter.
     * @param {CounterCreateArgs} args - Arguments to create a Counter.
     * @example
     * // Create one Counter
     * const Counter = await prisma.counter.create({
     *   data: {
     *     // ... data to create a Counter
     *   }
     * })
     * 
     */
    create<T extends CounterCreateArgs>(args: SelectSubset<T, CounterCreateArgs<ExtArgs>>): Prisma__CounterClient<$Result.GetResult<Prisma.$CounterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Counters.
     * @param {CounterCreateManyArgs} args - Arguments to create many Counters.
     * @example
     * // Create many Counters
     * const counter = await prisma.counter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CounterCreateManyArgs>(args?: SelectSubset<T, CounterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Counters and returns the data saved in the database.
     * @param {CounterCreateManyAndReturnArgs} args - Arguments to create many Counters.
     * @example
     * // Create many Counters
     * const counter = await prisma.counter.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Counters and only return the `id`
     * const counterWithIdOnly = await prisma.counter.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CounterCreateManyAndReturnArgs>(args?: SelectSubset<T, CounterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CounterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Counter.
     * @param {CounterDeleteArgs} args - Arguments to delete one Counter.
     * @example
     * // Delete one Counter
     * const Counter = await prisma.counter.delete({
     *   where: {
     *     // ... filter to delete one Counter
     *   }
     * })
     * 
     */
    delete<T extends CounterDeleteArgs>(args: SelectSubset<T, CounterDeleteArgs<ExtArgs>>): Prisma__CounterClient<$Result.GetResult<Prisma.$CounterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Counter.
     * @param {CounterUpdateArgs} args - Arguments to update one Counter.
     * @example
     * // Update one Counter
     * const counter = await prisma.counter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CounterUpdateArgs>(args: SelectSubset<T, CounterUpdateArgs<ExtArgs>>): Prisma__CounterClient<$Result.GetResult<Prisma.$CounterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Counters.
     * @param {CounterDeleteManyArgs} args - Arguments to filter Counters to delete.
     * @example
     * // Delete a few Counters
     * const { count } = await prisma.counter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CounterDeleteManyArgs>(args?: SelectSubset<T, CounterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Counters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CounterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Counters
     * const counter = await prisma.counter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CounterUpdateManyArgs>(args: SelectSubset<T, CounterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Counters and returns the data updated in the database.
     * @param {CounterUpdateManyAndReturnArgs} args - Arguments to update many Counters.
     * @example
     * // Update many Counters
     * const counter = await prisma.counter.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Counters and only return the `id`
     * const counterWithIdOnly = await prisma.counter.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CounterUpdateManyAndReturnArgs>(args: SelectSubset<T, CounterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CounterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Counter.
     * @param {CounterUpsertArgs} args - Arguments to update or create a Counter.
     * @example
     * // Update or create a Counter
     * const counter = await prisma.counter.upsert({
     *   create: {
     *     // ... data to create a Counter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Counter we want to update
     *   }
     * })
     */
    upsert<T extends CounterUpsertArgs>(args: SelectSubset<T, CounterUpsertArgs<ExtArgs>>): Prisma__CounterClient<$Result.GetResult<Prisma.$CounterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Counters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CounterCountArgs} args - Arguments to filter Counters to count.
     * @example
     * // Count the number of Counters
     * const count = await prisma.counter.count({
     *   where: {
     *     // ... the filter for the Counters we want to count
     *   }
     * })
    **/
    count<T extends CounterCountArgs>(
      args?: Subset<T, CounterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CounterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Counter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CounterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CounterAggregateArgs>(args: Subset<T, CounterAggregateArgs>): Prisma.PrismaPromise<GetCounterAggregateType<T>>

    /**
     * Group by Counter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CounterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CounterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CounterGroupByArgs['orderBy'] }
        : { orderBy?: CounterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CounterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCounterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Counter model
   */
  readonly fields: CounterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Counter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CounterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    currentStaff<T extends Counter$currentStaffArgs<ExtArgs> = {}>(args?: Subset<T, Counter$currentStaffArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    tickets<T extends Counter$ticketsArgs<ExtArgs> = {}>(args?: Subset<T, Counter$ticketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Counter model
   */
  interface CounterFieldRefs {
    readonly id: FieldRef<"Counter", 'String'>
    readonly counterNumber: FieldRef<"Counter", 'Int'>
    readonly counterName: FieldRef<"Counter", 'String'>
    readonly isActive: FieldRef<"Counter", 'Boolean'>
    readonly updatedAt: FieldRef<"Counter", 'DateTime'>
    readonly currentStaffId: FieldRef<"Counter", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Counter findUnique
   */
  export type CounterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CounterInclude<ExtArgs> | null
    /**
     * Filter, which Counter to fetch.
     */
    where: CounterWhereUniqueInput
  }

  /**
   * Counter findUniqueOrThrow
   */
  export type CounterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CounterInclude<ExtArgs> | null
    /**
     * Filter, which Counter to fetch.
     */
    where: CounterWhereUniqueInput
  }

  /**
   * Counter findFirst
   */
  export type CounterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CounterInclude<ExtArgs> | null
    /**
     * Filter, which Counter to fetch.
     */
    where?: CounterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Counters to fetch.
     */
    orderBy?: CounterOrderByWithRelationInput | CounterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Counters.
     */
    cursor?: CounterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Counters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Counters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Counters.
     */
    distinct?: CounterScalarFieldEnum | CounterScalarFieldEnum[]
  }

  /**
   * Counter findFirstOrThrow
   */
  export type CounterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CounterInclude<ExtArgs> | null
    /**
     * Filter, which Counter to fetch.
     */
    where?: CounterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Counters to fetch.
     */
    orderBy?: CounterOrderByWithRelationInput | CounterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Counters.
     */
    cursor?: CounterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Counters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Counters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Counters.
     */
    distinct?: CounterScalarFieldEnum | CounterScalarFieldEnum[]
  }

  /**
   * Counter findMany
   */
  export type CounterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CounterInclude<ExtArgs> | null
    /**
     * Filter, which Counters to fetch.
     */
    where?: CounterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Counters to fetch.
     */
    orderBy?: CounterOrderByWithRelationInput | CounterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Counters.
     */
    cursor?: CounterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Counters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Counters.
     */
    skip?: number
    distinct?: CounterScalarFieldEnum | CounterScalarFieldEnum[]
  }

  /**
   * Counter create
   */
  export type CounterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CounterInclude<ExtArgs> | null
    /**
     * The data needed to create a Counter.
     */
    data: XOR<CounterCreateInput, CounterUncheckedCreateInput>
  }

  /**
   * Counter createMany
   */
  export type CounterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Counters.
     */
    data: CounterCreateManyInput | CounterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Counter createManyAndReturn
   */
  export type CounterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * The data used to create many Counters.
     */
    data: CounterCreateManyInput | CounterCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CounterIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Counter update
   */
  export type CounterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CounterInclude<ExtArgs> | null
    /**
     * The data needed to update a Counter.
     */
    data: XOR<CounterUpdateInput, CounterUncheckedUpdateInput>
    /**
     * Choose, which Counter to update.
     */
    where: CounterWhereUniqueInput
  }

  /**
   * Counter updateMany
   */
  export type CounterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Counters.
     */
    data: XOR<CounterUpdateManyMutationInput, CounterUncheckedUpdateManyInput>
    /**
     * Filter which Counters to update
     */
    where?: CounterWhereInput
    /**
     * Limit how many Counters to update.
     */
    limit?: number
  }

  /**
   * Counter updateManyAndReturn
   */
  export type CounterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * The data used to update Counters.
     */
    data: XOR<CounterUpdateManyMutationInput, CounterUncheckedUpdateManyInput>
    /**
     * Filter which Counters to update
     */
    where?: CounterWhereInput
    /**
     * Limit how many Counters to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CounterIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Counter upsert
   */
  export type CounterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CounterInclude<ExtArgs> | null
    /**
     * The filter to search for the Counter to update in case it exists.
     */
    where: CounterWhereUniqueInput
    /**
     * In case the Counter found by the `where` argument doesn't exist, create a new Counter with this data.
     */
    create: XOR<CounterCreateInput, CounterUncheckedCreateInput>
    /**
     * In case the Counter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CounterUpdateInput, CounterUncheckedUpdateInput>
  }

  /**
   * Counter delete
   */
  export type CounterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CounterInclude<ExtArgs> | null
    /**
     * Filter which Counter to delete.
     */
    where: CounterWhereUniqueInput
  }

  /**
   * Counter deleteMany
   */
  export type CounterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Counters to delete
     */
    where?: CounterWhereInput
    /**
     * Limit how many Counters to delete.
     */
    limit?: number
  }

  /**
   * Counter.currentStaff
   */
  export type Counter$currentStaffArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Counter.tickets
   */
  export type Counter$ticketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    cursor?: TicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Counter without action
   */
  export type CounterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CounterInclude<ExtArgs> | null
  }


  /**
   * Model Ticket
   */

  export type AggregateTicket = {
    _count: TicketCountAggregateOutputType | null
    _avg: TicketAvgAggregateOutputType | null
    _sum: TicketSumAggregateOutputType | null
    _min: TicketMinAggregateOutputType | null
    _max: TicketMaxAggregateOutputType | null
  }

  export type TicketAvgAggregateOutputType = {
    initialPosition: number | null
    currentPosition: number | null
    estimatedWaitTimeMinutes: number | null
    skipCount: number | null
  }

  export type TicketSumAggregateOutputType = {
    initialPosition: number | null
    currentPosition: number | null
    estimatedWaitTimeMinutes: number | null
    skipCount: number | null
  }

  export type TicketMinAggregateOutputType = {
    id: string | null
    ticketNumber: string | null
    customerName: string | null
    phoneNumber: string | null
    preferredChannel: $Enums.NotificationChannel | null
    status: $Enums.TicketStatus | null
    initialPosition: number | null
    currentPosition: number | null
    estimatedWaitTimeMinutes: number | null
    skipCount: number | null
    joinedAt: Date | null
    calledAt: Date | null
    servicedAt: Date | null
    completedAt: Date | null
    skippedAt: Date | null
    cancelledAt: Date | null
    counterId: string | null
    servicedByStaffId: string | null
  }

  export type TicketMaxAggregateOutputType = {
    id: string | null
    ticketNumber: string | null
    customerName: string | null
    phoneNumber: string | null
    preferredChannel: $Enums.NotificationChannel | null
    status: $Enums.TicketStatus | null
    initialPosition: number | null
    currentPosition: number | null
    estimatedWaitTimeMinutes: number | null
    skipCount: number | null
    joinedAt: Date | null
    calledAt: Date | null
    servicedAt: Date | null
    completedAt: Date | null
    skippedAt: Date | null
    cancelledAt: Date | null
    counterId: string | null
    servicedByStaffId: string | null
  }

  export type TicketCountAggregateOutputType = {
    id: number
    ticketNumber: number
    customerName: number
    phoneNumber: number
    preferredChannel: number
    status: number
    initialPosition: number
    currentPosition: number
    estimatedWaitTimeMinutes: number
    skipCount: number
    joinedAt: number
    calledAt: number
    servicedAt: number
    completedAt: number
    skippedAt: number
    cancelledAt: number
    counterId: number
    servicedByStaffId: number
    _all: number
  }


  export type TicketAvgAggregateInputType = {
    initialPosition?: true
    currentPosition?: true
    estimatedWaitTimeMinutes?: true
    skipCount?: true
  }

  export type TicketSumAggregateInputType = {
    initialPosition?: true
    currentPosition?: true
    estimatedWaitTimeMinutes?: true
    skipCount?: true
  }

  export type TicketMinAggregateInputType = {
    id?: true
    ticketNumber?: true
    customerName?: true
    phoneNumber?: true
    preferredChannel?: true
    status?: true
    initialPosition?: true
    currentPosition?: true
    estimatedWaitTimeMinutes?: true
    skipCount?: true
    joinedAt?: true
    calledAt?: true
    servicedAt?: true
    completedAt?: true
    skippedAt?: true
    cancelledAt?: true
    counterId?: true
    servicedByStaffId?: true
  }

  export type TicketMaxAggregateInputType = {
    id?: true
    ticketNumber?: true
    customerName?: true
    phoneNumber?: true
    preferredChannel?: true
    status?: true
    initialPosition?: true
    currentPosition?: true
    estimatedWaitTimeMinutes?: true
    skipCount?: true
    joinedAt?: true
    calledAt?: true
    servicedAt?: true
    completedAt?: true
    skippedAt?: true
    cancelledAt?: true
    counterId?: true
    servicedByStaffId?: true
  }

  export type TicketCountAggregateInputType = {
    id?: true
    ticketNumber?: true
    customerName?: true
    phoneNumber?: true
    preferredChannel?: true
    status?: true
    initialPosition?: true
    currentPosition?: true
    estimatedWaitTimeMinutes?: true
    skipCount?: true
    joinedAt?: true
    calledAt?: true
    servicedAt?: true
    completedAt?: true
    skippedAt?: true
    cancelledAt?: true
    counterId?: true
    servicedByStaffId?: true
    _all?: true
  }

  export type TicketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ticket to aggregate.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tickets
    **/
    _count?: true | TicketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TicketAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TicketSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TicketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TicketMaxAggregateInputType
  }

  export type GetTicketAggregateType<T extends TicketAggregateArgs> = {
        [P in keyof T & keyof AggregateTicket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTicket[P]>
      : GetScalarType<T[P], AggregateTicket[P]>
  }




  export type TicketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithAggregationInput | TicketOrderByWithAggregationInput[]
    by: TicketScalarFieldEnum[] | TicketScalarFieldEnum
    having?: TicketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TicketCountAggregateInputType | true
    _avg?: TicketAvgAggregateInputType
    _sum?: TicketSumAggregateInputType
    _min?: TicketMinAggregateInputType
    _max?: TicketMaxAggregateInputType
  }

  export type TicketGroupByOutputType = {
    id: string
    ticketNumber: string
    customerName: string
    phoneNumber: string
    preferredChannel: $Enums.NotificationChannel
    status: $Enums.TicketStatus
    initialPosition: number
    currentPosition: number
    estimatedWaitTimeMinutes: number
    skipCount: number
    joinedAt: Date
    calledAt: Date | null
    servicedAt: Date | null
    completedAt: Date | null
    skippedAt: Date | null
    cancelledAt: Date | null
    counterId: string | null
    servicedByStaffId: string | null
    _count: TicketCountAggregateOutputType | null
    _avg: TicketAvgAggregateOutputType | null
    _sum: TicketSumAggregateOutputType | null
    _min: TicketMinAggregateOutputType | null
    _max: TicketMaxAggregateOutputType | null
  }

  type GetTicketGroupByPayload<T extends TicketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TicketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TicketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TicketGroupByOutputType[P]>
            : GetScalarType<T[P], TicketGroupByOutputType[P]>
        }
      >
    >


  export type TicketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketNumber?: boolean
    customerName?: boolean
    phoneNumber?: boolean
    preferredChannel?: boolean
    status?: boolean
    initialPosition?: boolean
    currentPosition?: boolean
    estimatedWaitTimeMinutes?: boolean
    skipCount?: boolean
    joinedAt?: boolean
    calledAt?: boolean
    servicedAt?: boolean
    completedAt?: boolean
    skippedAt?: boolean
    cancelledAt?: boolean
    counterId?: boolean
    servicedByStaffId?: boolean
    counter?: boolean | Ticket$counterArgs<ExtArgs>
    servicedByStaff?: boolean | Ticket$servicedByStaffArgs<ExtArgs>
    notificationLogs?: boolean | Ticket$notificationLogsArgs<ExtArgs>
    _count?: boolean | TicketCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ticket"]>

  export type TicketSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketNumber?: boolean
    customerName?: boolean
    phoneNumber?: boolean
    preferredChannel?: boolean
    status?: boolean
    initialPosition?: boolean
    currentPosition?: boolean
    estimatedWaitTimeMinutes?: boolean
    skipCount?: boolean
    joinedAt?: boolean
    calledAt?: boolean
    servicedAt?: boolean
    completedAt?: boolean
    skippedAt?: boolean
    cancelledAt?: boolean
    counterId?: boolean
    servicedByStaffId?: boolean
    counter?: boolean | Ticket$counterArgs<ExtArgs>
    servicedByStaff?: boolean | Ticket$servicedByStaffArgs<ExtArgs>
  }, ExtArgs["result"]["ticket"]>

  export type TicketSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketNumber?: boolean
    customerName?: boolean
    phoneNumber?: boolean
    preferredChannel?: boolean
    status?: boolean
    initialPosition?: boolean
    currentPosition?: boolean
    estimatedWaitTimeMinutes?: boolean
    skipCount?: boolean
    joinedAt?: boolean
    calledAt?: boolean
    servicedAt?: boolean
    completedAt?: boolean
    skippedAt?: boolean
    cancelledAt?: boolean
    counterId?: boolean
    servicedByStaffId?: boolean
    counter?: boolean | Ticket$counterArgs<ExtArgs>
    servicedByStaff?: boolean | Ticket$servicedByStaffArgs<ExtArgs>
  }, ExtArgs["result"]["ticket"]>

  export type TicketSelectScalar = {
    id?: boolean
    ticketNumber?: boolean
    customerName?: boolean
    phoneNumber?: boolean
    preferredChannel?: boolean
    status?: boolean
    initialPosition?: boolean
    currentPosition?: boolean
    estimatedWaitTimeMinutes?: boolean
    skipCount?: boolean
    joinedAt?: boolean
    calledAt?: boolean
    servicedAt?: boolean
    completedAt?: boolean
    skippedAt?: boolean
    cancelledAt?: boolean
    counterId?: boolean
    servicedByStaffId?: boolean
  }

  export type TicketOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ticketNumber" | "customerName" | "phoneNumber" | "preferredChannel" | "status" | "initialPosition" | "currentPosition" | "estimatedWaitTimeMinutes" | "skipCount" | "joinedAt" | "calledAt" | "servicedAt" | "completedAt" | "skippedAt" | "cancelledAt" | "counterId" | "servicedByStaffId", ExtArgs["result"]["ticket"]>
  export type TicketInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    counter?: boolean | Ticket$counterArgs<ExtArgs>
    servicedByStaff?: boolean | Ticket$servicedByStaffArgs<ExtArgs>
    notificationLogs?: boolean | Ticket$notificationLogsArgs<ExtArgs>
    _count?: boolean | TicketCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TicketIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    counter?: boolean | Ticket$counterArgs<ExtArgs>
    servicedByStaff?: boolean | Ticket$servicedByStaffArgs<ExtArgs>
  }
  export type TicketIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    counter?: boolean | Ticket$counterArgs<ExtArgs>
    servicedByStaff?: boolean | Ticket$servicedByStaffArgs<ExtArgs>
  }

  export type $TicketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ticket"
    objects: {
      counter: Prisma.$CounterPayload<ExtArgs> | null
      servicedByStaff: Prisma.$UserPayload<ExtArgs> | null
      notificationLogs: Prisma.$NotificationLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ticketNumber: string
      customerName: string
      phoneNumber: string
      preferredChannel: $Enums.NotificationChannel
      status: $Enums.TicketStatus
      initialPosition: number
      currentPosition: number
      estimatedWaitTimeMinutes: number
      skipCount: number
      joinedAt: Date
      calledAt: Date | null
      servicedAt: Date | null
      completedAt: Date | null
      skippedAt: Date | null
      cancelledAt: Date | null
      counterId: string | null
      servicedByStaffId: string | null
    }, ExtArgs["result"]["ticket"]>
    composites: {}
  }

  type TicketGetPayload<S extends boolean | null | undefined | TicketDefaultArgs> = $Result.GetResult<Prisma.$TicketPayload, S>

  type TicketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TicketFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TicketCountAggregateInputType | true
    }

  export interface TicketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ticket'], meta: { name: 'Ticket' } }
    /**
     * Find zero or one Ticket that matches the filter.
     * @param {TicketFindUniqueArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TicketFindUniqueArgs>(args: SelectSubset<T, TicketFindUniqueArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ticket that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TicketFindUniqueOrThrowArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TicketFindUniqueOrThrowArgs>(args: SelectSubset<T, TicketFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ticket that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindFirstArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TicketFindFirstArgs>(args?: SelectSubset<T, TicketFindFirstArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ticket that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindFirstOrThrowArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TicketFindFirstOrThrowArgs>(args?: SelectSubset<T, TicketFindFirstOrThrowArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tickets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tickets
     * const tickets = await prisma.ticket.findMany()
     * 
     * // Get first 10 Tickets
     * const tickets = await prisma.ticket.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ticketWithIdOnly = await prisma.ticket.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TicketFindManyArgs>(args?: SelectSubset<T, TicketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ticket.
     * @param {TicketCreateArgs} args - Arguments to create a Ticket.
     * @example
     * // Create one Ticket
     * const Ticket = await prisma.ticket.create({
     *   data: {
     *     // ... data to create a Ticket
     *   }
     * })
     * 
     */
    create<T extends TicketCreateArgs>(args: SelectSubset<T, TicketCreateArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tickets.
     * @param {TicketCreateManyArgs} args - Arguments to create many Tickets.
     * @example
     * // Create many Tickets
     * const ticket = await prisma.ticket.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TicketCreateManyArgs>(args?: SelectSubset<T, TicketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tickets and returns the data saved in the database.
     * @param {TicketCreateManyAndReturnArgs} args - Arguments to create many Tickets.
     * @example
     * // Create many Tickets
     * const ticket = await prisma.ticket.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tickets and only return the `id`
     * const ticketWithIdOnly = await prisma.ticket.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TicketCreateManyAndReturnArgs>(args?: SelectSubset<T, TicketCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ticket.
     * @param {TicketDeleteArgs} args - Arguments to delete one Ticket.
     * @example
     * // Delete one Ticket
     * const Ticket = await prisma.ticket.delete({
     *   where: {
     *     // ... filter to delete one Ticket
     *   }
     * })
     * 
     */
    delete<T extends TicketDeleteArgs>(args: SelectSubset<T, TicketDeleteArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ticket.
     * @param {TicketUpdateArgs} args - Arguments to update one Ticket.
     * @example
     * // Update one Ticket
     * const ticket = await prisma.ticket.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TicketUpdateArgs>(args: SelectSubset<T, TicketUpdateArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tickets.
     * @param {TicketDeleteManyArgs} args - Arguments to filter Tickets to delete.
     * @example
     * // Delete a few Tickets
     * const { count } = await prisma.ticket.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TicketDeleteManyArgs>(args?: SelectSubset<T, TicketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tickets
     * const ticket = await prisma.ticket.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TicketUpdateManyArgs>(args: SelectSubset<T, TicketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tickets and returns the data updated in the database.
     * @param {TicketUpdateManyAndReturnArgs} args - Arguments to update many Tickets.
     * @example
     * // Update many Tickets
     * const ticket = await prisma.ticket.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tickets and only return the `id`
     * const ticketWithIdOnly = await prisma.ticket.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TicketUpdateManyAndReturnArgs>(args: SelectSubset<T, TicketUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ticket.
     * @param {TicketUpsertArgs} args - Arguments to update or create a Ticket.
     * @example
     * // Update or create a Ticket
     * const ticket = await prisma.ticket.upsert({
     *   create: {
     *     // ... data to create a Ticket
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ticket we want to update
     *   }
     * })
     */
    upsert<T extends TicketUpsertArgs>(args: SelectSubset<T, TicketUpsertArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketCountArgs} args - Arguments to filter Tickets to count.
     * @example
     * // Count the number of Tickets
     * const count = await prisma.ticket.count({
     *   where: {
     *     // ... the filter for the Tickets we want to count
     *   }
     * })
    **/
    count<T extends TicketCountArgs>(
      args?: Subset<T, TicketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TicketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ticket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TicketAggregateArgs>(args: Subset<T, TicketAggregateArgs>): Prisma.PrismaPromise<GetTicketAggregateType<T>>

    /**
     * Group by Ticket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TicketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TicketGroupByArgs['orderBy'] }
        : { orderBy?: TicketGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TicketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTicketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ticket model
   */
  readonly fields: TicketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ticket.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TicketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    counter<T extends Ticket$counterArgs<ExtArgs> = {}>(args?: Subset<T, Ticket$counterArgs<ExtArgs>>): Prisma__CounterClient<$Result.GetResult<Prisma.$CounterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    servicedByStaff<T extends Ticket$servicedByStaffArgs<ExtArgs> = {}>(args?: Subset<T, Ticket$servicedByStaffArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    notificationLogs<T extends Ticket$notificationLogsArgs<ExtArgs> = {}>(args?: Subset<T, Ticket$notificationLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Ticket model
   */
  interface TicketFieldRefs {
    readonly id: FieldRef<"Ticket", 'String'>
    readonly ticketNumber: FieldRef<"Ticket", 'String'>
    readonly customerName: FieldRef<"Ticket", 'String'>
    readonly phoneNumber: FieldRef<"Ticket", 'String'>
    readonly preferredChannel: FieldRef<"Ticket", 'NotificationChannel'>
    readonly status: FieldRef<"Ticket", 'TicketStatus'>
    readonly initialPosition: FieldRef<"Ticket", 'Int'>
    readonly currentPosition: FieldRef<"Ticket", 'Int'>
    readonly estimatedWaitTimeMinutes: FieldRef<"Ticket", 'Int'>
    readonly skipCount: FieldRef<"Ticket", 'Int'>
    readonly joinedAt: FieldRef<"Ticket", 'DateTime'>
    readonly calledAt: FieldRef<"Ticket", 'DateTime'>
    readonly servicedAt: FieldRef<"Ticket", 'DateTime'>
    readonly completedAt: FieldRef<"Ticket", 'DateTime'>
    readonly skippedAt: FieldRef<"Ticket", 'DateTime'>
    readonly cancelledAt: FieldRef<"Ticket", 'DateTime'>
    readonly counterId: FieldRef<"Ticket", 'String'>
    readonly servicedByStaffId: FieldRef<"Ticket", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Ticket findUnique
   */
  export type TicketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket findUniqueOrThrow
   */
  export type TicketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket findFirst
   */
  export type TicketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tickets.
     */
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Ticket findFirstOrThrow
   */
  export type TicketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tickets.
     */
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Ticket findMany
   */
  export type TicketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Tickets to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Ticket create
   */
  export type TicketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The data needed to create a Ticket.
     */
    data: XOR<TicketCreateInput, TicketUncheckedCreateInput>
  }

  /**
   * Ticket createMany
   */
  export type TicketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tickets.
     */
    data: TicketCreateManyInput | TicketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Ticket createManyAndReturn
   */
  export type TicketCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * The data used to create many Tickets.
     */
    data: TicketCreateManyInput | TicketCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ticket update
   */
  export type TicketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The data needed to update a Ticket.
     */
    data: XOR<TicketUpdateInput, TicketUncheckedUpdateInput>
    /**
     * Choose, which Ticket to update.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket updateMany
   */
  export type TicketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tickets.
     */
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyInput>
    /**
     * Filter which Tickets to update
     */
    where?: TicketWhereInput
    /**
     * Limit how many Tickets to update.
     */
    limit?: number
  }

  /**
   * Ticket updateManyAndReturn
   */
  export type TicketUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * The data used to update Tickets.
     */
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyInput>
    /**
     * Filter which Tickets to update
     */
    where?: TicketWhereInput
    /**
     * Limit how many Tickets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ticket upsert
   */
  export type TicketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The filter to search for the Ticket to update in case it exists.
     */
    where: TicketWhereUniqueInput
    /**
     * In case the Ticket found by the `where` argument doesn't exist, create a new Ticket with this data.
     */
    create: XOR<TicketCreateInput, TicketUncheckedCreateInput>
    /**
     * In case the Ticket was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TicketUpdateInput, TicketUncheckedUpdateInput>
  }

  /**
   * Ticket delete
   */
  export type TicketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter which Ticket to delete.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket deleteMany
   */
  export type TicketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tickets to delete
     */
    where?: TicketWhereInput
    /**
     * Limit how many Tickets to delete.
     */
    limit?: number
  }

  /**
   * Ticket.counter
   */
  export type Ticket$counterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CounterInclude<ExtArgs> | null
    where?: CounterWhereInput
  }

  /**
   * Ticket.servicedByStaff
   */
  export type Ticket$servicedByStaffArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Ticket.notificationLogs
   */
  export type Ticket$notificationLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationLogInclude<ExtArgs> | null
    where?: NotificationLogWhereInput
    orderBy?: NotificationLogOrderByWithRelationInput | NotificationLogOrderByWithRelationInput[]
    cursor?: NotificationLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationLogScalarFieldEnum | NotificationLogScalarFieldEnum[]
  }

  /**
   * Ticket without action
   */
  export type TicketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
  }


  /**
   * Model NotificationLog
   */

  export type AggregateNotificationLog = {
    _count: NotificationLogCountAggregateOutputType | null
    _min: NotificationLogMinAggregateOutputType | null
    _max: NotificationLogMaxAggregateOutputType | null
  }

  export type NotificationLogMinAggregateOutputType = {
    id: string | null
    ticketId: string | null
    channel: $Enums.NotificationChannel | null
    trigger: $Enums.NotificationTrigger | null
    message: string | null
    sentAt: Date | null
  }

  export type NotificationLogMaxAggregateOutputType = {
    id: string | null
    ticketId: string | null
    channel: $Enums.NotificationChannel | null
    trigger: $Enums.NotificationTrigger | null
    message: string | null
    sentAt: Date | null
  }

  export type NotificationLogCountAggregateOutputType = {
    id: number
    ticketId: number
    channel: number
    trigger: number
    message: number
    sentAt: number
    _all: number
  }


  export type NotificationLogMinAggregateInputType = {
    id?: true
    ticketId?: true
    channel?: true
    trigger?: true
    message?: true
    sentAt?: true
  }

  export type NotificationLogMaxAggregateInputType = {
    id?: true
    ticketId?: true
    channel?: true
    trigger?: true
    message?: true
    sentAt?: true
  }

  export type NotificationLogCountAggregateInputType = {
    id?: true
    ticketId?: true
    channel?: true
    trigger?: true
    message?: true
    sentAt?: true
    _all?: true
  }

  export type NotificationLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationLog to aggregate.
     */
    where?: NotificationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationLogs to fetch.
     */
    orderBy?: NotificationLogOrderByWithRelationInput | NotificationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NotificationLogs
    **/
    _count?: true | NotificationLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationLogMaxAggregateInputType
  }

  export type GetNotificationLogAggregateType<T extends NotificationLogAggregateArgs> = {
        [P in keyof T & keyof AggregateNotificationLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotificationLog[P]>
      : GetScalarType<T[P], AggregateNotificationLog[P]>
  }




  export type NotificationLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationLogWhereInput
    orderBy?: NotificationLogOrderByWithAggregationInput | NotificationLogOrderByWithAggregationInput[]
    by: NotificationLogScalarFieldEnum[] | NotificationLogScalarFieldEnum
    having?: NotificationLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationLogCountAggregateInputType | true
    _min?: NotificationLogMinAggregateInputType
    _max?: NotificationLogMaxAggregateInputType
  }

  export type NotificationLogGroupByOutputType = {
    id: string
    ticketId: string
    channel: $Enums.NotificationChannel
    trigger: $Enums.NotificationTrigger
    message: string
    sentAt: Date
    _count: NotificationLogCountAggregateOutputType | null
    _min: NotificationLogMinAggregateOutputType | null
    _max: NotificationLogMaxAggregateOutputType | null
  }

  type GetNotificationLogGroupByPayload<T extends NotificationLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationLogGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationLogGroupByOutputType[P]>
        }
      >
    >


  export type NotificationLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketId?: boolean
    channel?: boolean
    trigger?: boolean
    message?: boolean
    sentAt?: boolean
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notificationLog"]>

  export type NotificationLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketId?: boolean
    channel?: boolean
    trigger?: boolean
    message?: boolean
    sentAt?: boolean
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notificationLog"]>

  export type NotificationLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketId?: boolean
    channel?: boolean
    trigger?: boolean
    message?: boolean
    sentAt?: boolean
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notificationLog"]>

  export type NotificationLogSelectScalar = {
    id?: boolean
    ticketId?: boolean
    channel?: boolean
    trigger?: boolean
    message?: boolean
    sentAt?: boolean
  }

  export type NotificationLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ticketId" | "channel" | "trigger" | "message" | "sentAt", ExtArgs["result"]["notificationLog"]>
  export type NotificationLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
  }
  export type NotificationLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
  }
  export type NotificationLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
  }

  export type $NotificationLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NotificationLog"
    objects: {
      ticket: Prisma.$TicketPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ticketId: string
      channel: $Enums.NotificationChannel
      trigger: $Enums.NotificationTrigger
      message: string
      sentAt: Date
    }, ExtArgs["result"]["notificationLog"]>
    composites: {}
  }

  type NotificationLogGetPayload<S extends boolean | null | undefined | NotificationLogDefaultArgs> = $Result.GetResult<Prisma.$NotificationLogPayload, S>

  type NotificationLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationLogCountAggregateInputType | true
    }

  export interface NotificationLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NotificationLog'], meta: { name: 'NotificationLog' } }
    /**
     * Find zero or one NotificationLog that matches the filter.
     * @param {NotificationLogFindUniqueArgs} args - Arguments to find a NotificationLog
     * @example
     * // Get one NotificationLog
     * const notificationLog = await prisma.notificationLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationLogFindUniqueArgs>(args: SelectSubset<T, NotificationLogFindUniqueArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NotificationLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationLogFindUniqueOrThrowArgs} args - Arguments to find a NotificationLog
     * @example
     * // Get one NotificationLog
     * const notificationLog = await prisma.notificationLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationLogFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogFindFirstArgs} args - Arguments to find a NotificationLog
     * @example
     * // Get one NotificationLog
     * const notificationLog = await prisma.notificationLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationLogFindFirstArgs>(args?: SelectSubset<T, NotificationLogFindFirstArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogFindFirstOrThrowArgs} args - Arguments to find a NotificationLog
     * @example
     * // Get one NotificationLog
     * const notificationLog = await prisma.notificationLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationLogFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NotificationLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NotificationLogs
     * const notificationLogs = await prisma.notificationLog.findMany()
     * 
     * // Get first 10 NotificationLogs
     * const notificationLogs = await prisma.notificationLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationLogWithIdOnly = await prisma.notificationLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationLogFindManyArgs>(args?: SelectSubset<T, NotificationLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NotificationLog.
     * @param {NotificationLogCreateArgs} args - Arguments to create a NotificationLog.
     * @example
     * // Create one NotificationLog
     * const NotificationLog = await prisma.notificationLog.create({
     *   data: {
     *     // ... data to create a NotificationLog
     *   }
     * })
     * 
     */
    create<T extends NotificationLogCreateArgs>(args: SelectSubset<T, NotificationLogCreateArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NotificationLogs.
     * @param {NotificationLogCreateManyArgs} args - Arguments to create many NotificationLogs.
     * @example
     * // Create many NotificationLogs
     * const notificationLog = await prisma.notificationLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationLogCreateManyArgs>(args?: SelectSubset<T, NotificationLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NotificationLogs and returns the data saved in the database.
     * @param {NotificationLogCreateManyAndReturnArgs} args - Arguments to create many NotificationLogs.
     * @example
     * // Create many NotificationLogs
     * const notificationLog = await prisma.notificationLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NotificationLogs and only return the `id`
     * const notificationLogWithIdOnly = await prisma.notificationLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationLogCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NotificationLog.
     * @param {NotificationLogDeleteArgs} args - Arguments to delete one NotificationLog.
     * @example
     * // Delete one NotificationLog
     * const NotificationLog = await prisma.notificationLog.delete({
     *   where: {
     *     // ... filter to delete one NotificationLog
     *   }
     * })
     * 
     */
    delete<T extends NotificationLogDeleteArgs>(args: SelectSubset<T, NotificationLogDeleteArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NotificationLog.
     * @param {NotificationLogUpdateArgs} args - Arguments to update one NotificationLog.
     * @example
     * // Update one NotificationLog
     * const notificationLog = await prisma.notificationLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationLogUpdateArgs>(args: SelectSubset<T, NotificationLogUpdateArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NotificationLogs.
     * @param {NotificationLogDeleteManyArgs} args - Arguments to filter NotificationLogs to delete.
     * @example
     * // Delete a few NotificationLogs
     * const { count } = await prisma.notificationLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationLogDeleteManyArgs>(args?: SelectSubset<T, NotificationLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NotificationLogs
     * const notificationLog = await prisma.notificationLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationLogUpdateManyArgs>(args: SelectSubset<T, NotificationLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationLogs and returns the data updated in the database.
     * @param {NotificationLogUpdateManyAndReturnArgs} args - Arguments to update many NotificationLogs.
     * @example
     * // Update many NotificationLogs
     * const notificationLog = await prisma.notificationLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NotificationLogs and only return the `id`
     * const notificationLogWithIdOnly = await prisma.notificationLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationLogUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NotificationLog.
     * @param {NotificationLogUpsertArgs} args - Arguments to update or create a NotificationLog.
     * @example
     * // Update or create a NotificationLog
     * const notificationLog = await prisma.notificationLog.upsert({
     *   create: {
     *     // ... data to create a NotificationLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NotificationLog we want to update
     *   }
     * })
     */
    upsert<T extends NotificationLogUpsertArgs>(args: SelectSubset<T, NotificationLogUpsertArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NotificationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogCountArgs} args - Arguments to filter NotificationLogs to count.
     * @example
     * // Count the number of NotificationLogs
     * const count = await prisma.notificationLog.count({
     *   where: {
     *     // ... the filter for the NotificationLogs we want to count
     *   }
     * })
    **/
    count<T extends NotificationLogCountArgs>(
      args?: Subset<T, NotificationLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NotificationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationLogAggregateArgs>(args: Subset<T, NotificationLogAggregateArgs>): Prisma.PrismaPromise<GetNotificationLogAggregateType<T>>

    /**
     * Group by NotificationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationLogGroupByArgs['orderBy'] }
        : { orderBy?: NotificationLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NotificationLog model
   */
  readonly fields: NotificationLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NotificationLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ticket<T extends TicketDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TicketDefaultArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NotificationLog model
   */
  interface NotificationLogFieldRefs {
    readonly id: FieldRef<"NotificationLog", 'String'>
    readonly ticketId: FieldRef<"NotificationLog", 'String'>
    readonly channel: FieldRef<"NotificationLog", 'NotificationChannel'>
    readonly trigger: FieldRef<"NotificationLog", 'NotificationTrigger'>
    readonly message: FieldRef<"NotificationLog", 'String'>
    readonly sentAt: FieldRef<"NotificationLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NotificationLog findUnique
   */
  export type NotificationLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationLogInclude<ExtArgs> | null
    /**
     * Filter, which NotificationLog to fetch.
     */
    where: NotificationLogWhereUniqueInput
  }

  /**
   * NotificationLog findUniqueOrThrow
   */
  export type NotificationLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationLogInclude<ExtArgs> | null
    /**
     * Filter, which NotificationLog to fetch.
     */
    where: NotificationLogWhereUniqueInput
  }

  /**
   * NotificationLog findFirst
   */
  export type NotificationLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationLogInclude<ExtArgs> | null
    /**
     * Filter, which NotificationLog to fetch.
     */
    where?: NotificationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationLogs to fetch.
     */
    orderBy?: NotificationLogOrderByWithRelationInput | NotificationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationLogs.
     */
    cursor?: NotificationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationLogs.
     */
    distinct?: NotificationLogScalarFieldEnum | NotificationLogScalarFieldEnum[]
  }

  /**
   * NotificationLog findFirstOrThrow
   */
  export type NotificationLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationLogInclude<ExtArgs> | null
    /**
     * Filter, which NotificationLog to fetch.
     */
    where?: NotificationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationLogs to fetch.
     */
    orderBy?: NotificationLogOrderByWithRelationInput | NotificationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationLogs.
     */
    cursor?: NotificationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationLogs.
     */
    distinct?: NotificationLogScalarFieldEnum | NotificationLogScalarFieldEnum[]
  }

  /**
   * NotificationLog findMany
   */
  export type NotificationLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationLogInclude<ExtArgs> | null
    /**
     * Filter, which NotificationLogs to fetch.
     */
    where?: NotificationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationLogs to fetch.
     */
    orderBy?: NotificationLogOrderByWithRelationInput | NotificationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NotificationLogs.
     */
    cursor?: NotificationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationLogs.
     */
    skip?: number
    distinct?: NotificationLogScalarFieldEnum | NotificationLogScalarFieldEnum[]
  }

  /**
   * NotificationLog create
   */
  export type NotificationLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationLogInclude<ExtArgs> | null
    /**
     * The data needed to create a NotificationLog.
     */
    data: XOR<NotificationLogCreateInput, NotificationLogUncheckedCreateInput>
  }

  /**
   * NotificationLog createMany
   */
  export type NotificationLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NotificationLogs.
     */
    data: NotificationLogCreateManyInput | NotificationLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationLog createManyAndReturn
   */
  export type NotificationLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * The data used to create many NotificationLogs.
     */
    data: NotificationLogCreateManyInput | NotificationLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NotificationLog update
   */
  export type NotificationLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationLogInclude<ExtArgs> | null
    /**
     * The data needed to update a NotificationLog.
     */
    data: XOR<NotificationLogUpdateInput, NotificationLogUncheckedUpdateInput>
    /**
     * Choose, which NotificationLog to update.
     */
    where: NotificationLogWhereUniqueInput
  }

  /**
   * NotificationLog updateMany
   */
  export type NotificationLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NotificationLogs.
     */
    data: XOR<NotificationLogUpdateManyMutationInput, NotificationLogUncheckedUpdateManyInput>
    /**
     * Filter which NotificationLogs to update
     */
    where?: NotificationLogWhereInput
    /**
     * Limit how many NotificationLogs to update.
     */
    limit?: number
  }

  /**
   * NotificationLog updateManyAndReturn
   */
  export type NotificationLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * The data used to update NotificationLogs.
     */
    data: XOR<NotificationLogUpdateManyMutationInput, NotificationLogUncheckedUpdateManyInput>
    /**
     * Filter which NotificationLogs to update
     */
    where?: NotificationLogWhereInput
    /**
     * Limit how many NotificationLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * NotificationLog upsert
   */
  export type NotificationLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationLogInclude<ExtArgs> | null
    /**
     * The filter to search for the NotificationLog to update in case it exists.
     */
    where: NotificationLogWhereUniqueInput
    /**
     * In case the NotificationLog found by the `where` argument doesn't exist, create a new NotificationLog with this data.
     */
    create: XOR<NotificationLogCreateInput, NotificationLogUncheckedCreateInput>
    /**
     * In case the NotificationLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationLogUpdateInput, NotificationLogUncheckedUpdateInput>
  }

  /**
   * NotificationLog delete
   */
  export type NotificationLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationLogInclude<ExtArgs> | null
    /**
     * Filter which NotificationLog to delete.
     */
    where: NotificationLogWhereUniqueInput
  }

  /**
   * NotificationLog deleteMany
   */
  export type NotificationLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationLogs to delete
     */
    where?: NotificationLogWhereInput
    /**
     * Limit how many NotificationLogs to delete.
     */
    limit?: number
  }

  /**
   * NotificationLog without action
   */
  export type NotificationLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    employeeId: 'employeeId',
    fullName: 'fullName',
    passwordHash: 'passwordHash',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CounterScalarFieldEnum: {
    id: 'id',
    counterNumber: 'counterNumber',
    counterName: 'counterName',
    isActive: 'isActive',
    updatedAt: 'updatedAt',
    currentStaffId: 'currentStaffId'
  };

  export type CounterScalarFieldEnum = (typeof CounterScalarFieldEnum)[keyof typeof CounterScalarFieldEnum]


  export const TicketScalarFieldEnum: {
    id: 'id',
    ticketNumber: 'ticketNumber',
    customerName: 'customerName',
    phoneNumber: 'phoneNumber',
    preferredChannel: 'preferredChannel',
    status: 'status',
    initialPosition: 'initialPosition',
    currentPosition: 'currentPosition',
    estimatedWaitTimeMinutes: 'estimatedWaitTimeMinutes',
    skipCount: 'skipCount',
    joinedAt: 'joinedAt',
    calledAt: 'calledAt',
    servicedAt: 'servicedAt',
    completedAt: 'completedAt',
    skippedAt: 'skippedAt',
    cancelledAt: 'cancelledAt',
    counterId: 'counterId',
    servicedByStaffId: 'servicedByStaffId'
  };

  export type TicketScalarFieldEnum = (typeof TicketScalarFieldEnum)[keyof typeof TicketScalarFieldEnum]


  export const NotificationLogScalarFieldEnum: {
    id: 'id',
    ticketId: 'ticketId',
    channel: 'channel',
    trigger: 'trigger',
    message: 'message',
    sentAt: 'sentAt'
  };

  export type NotificationLogScalarFieldEnum = (typeof NotificationLogScalarFieldEnum)[keyof typeof NotificationLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'NotificationChannel'
   */
  export type EnumNotificationChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationChannel'>
    


  /**
   * Reference to a field of type 'NotificationChannel[]'
   */
  export type ListEnumNotificationChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationChannel[]'>
    


  /**
   * Reference to a field of type 'TicketStatus'
   */
  export type EnumTicketStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketStatus'>
    


  /**
   * Reference to a field of type 'TicketStatus[]'
   */
  export type ListEnumTicketStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketStatus[]'>
    


  /**
   * Reference to a field of type 'NotificationTrigger'
   */
  export type EnumNotificationTriggerFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationTrigger'>
    


  /**
   * Reference to a field of type 'NotificationTrigger[]'
   */
  export type ListEnumNotificationTriggerFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationTrigger[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    employeeId?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    activeCounter?: XOR<CounterNullableScalarRelationFilter, CounterWhereInput> | null
    servicedTickets?: TicketListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    fullName?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    activeCounter?: CounterOrderByWithRelationInput
    servicedTickets?: TicketOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    employeeId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    fullName?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    activeCounter?: XOR<CounterNullableScalarRelationFilter, CounterWhereInput> | null
    servicedTickets?: TicketListRelationFilter
  }, "id" | "employeeId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    fullName?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    employeeId?: StringWithAggregatesFilter<"User"> | string
    fullName?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CounterWhereInput = {
    AND?: CounterWhereInput | CounterWhereInput[]
    OR?: CounterWhereInput[]
    NOT?: CounterWhereInput | CounterWhereInput[]
    id?: StringFilter<"Counter"> | string
    counterNumber?: IntFilter<"Counter"> | number
    counterName?: StringFilter<"Counter"> | string
    isActive?: BoolFilter<"Counter"> | boolean
    updatedAt?: DateTimeFilter<"Counter"> | Date | string
    currentStaffId?: StringNullableFilter<"Counter"> | string | null
    currentStaff?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    tickets?: TicketListRelationFilter
  }

  export type CounterOrderByWithRelationInput = {
    id?: SortOrder
    counterNumber?: SortOrder
    counterName?: SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
    currentStaffId?: SortOrderInput | SortOrder
    currentStaff?: UserOrderByWithRelationInput
    tickets?: TicketOrderByRelationAggregateInput
  }

  export type CounterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    counterNumber?: number
    currentStaffId?: string
    AND?: CounterWhereInput | CounterWhereInput[]
    OR?: CounterWhereInput[]
    NOT?: CounterWhereInput | CounterWhereInput[]
    counterName?: StringFilter<"Counter"> | string
    isActive?: BoolFilter<"Counter"> | boolean
    updatedAt?: DateTimeFilter<"Counter"> | Date | string
    currentStaff?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    tickets?: TicketListRelationFilter
  }, "id" | "counterNumber" | "currentStaffId">

  export type CounterOrderByWithAggregationInput = {
    id?: SortOrder
    counterNumber?: SortOrder
    counterName?: SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
    currentStaffId?: SortOrderInput | SortOrder
    _count?: CounterCountOrderByAggregateInput
    _avg?: CounterAvgOrderByAggregateInput
    _max?: CounterMaxOrderByAggregateInput
    _min?: CounterMinOrderByAggregateInput
    _sum?: CounterSumOrderByAggregateInput
  }

  export type CounterScalarWhereWithAggregatesInput = {
    AND?: CounterScalarWhereWithAggregatesInput | CounterScalarWhereWithAggregatesInput[]
    OR?: CounterScalarWhereWithAggregatesInput[]
    NOT?: CounterScalarWhereWithAggregatesInput | CounterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Counter"> | string
    counterNumber?: IntWithAggregatesFilter<"Counter"> | number
    counterName?: StringWithAggregatesFilter<"Counter"> | string
    isActive?: BoolWithAggregatesFilter<"Counter"> | boolean
    updatedAt?: DateTimeWithAggregatesFilter<"Counter"> | Date | string
    currentStaffId?: StringNullableWithAggregatesFilter<"Counter"> | string | null
  }

  export type TicketWhereInput = {
    AND?: TicketWhereInput | TicketWhereInput[]
    OR?: TicketWhereInput[]
    NOT?: TicketWhereInput | TicketWhereInput[]
    id?: StringFilter<"Ticket"> | string
    ticketNumber?: StringFilter<"Ticket"> | string
    customerName?: StringFilter<"Ticket"> | string
    phoneNumber?: StringFilter<"Ticket"> | string
    preferredChannel?: EnumNotificationChannelFilter<"Ticket"> | $Enums.NotificationChannel
    status?: EnumTicketStatusFilter<"Ticket"> | $Enums.TicketStatus
    initialPosition?: IntFilter<"Ticket"> | number
    currentPosition?: IntFilter<"Ticket"> | number
    estimatedWaitTimeMinutes?: IntFilter<"Ticket"> | number
    skipCount?: IntFilter<"Ticket"> | number
    joinedAt?: DateTimeFilter<"Ticket"> | Date | string
    calledAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    servicedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    skippedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    cancelledAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    counterId?: StringNullableFilter<"Ticket"> | string | null
    servicedByStaffId?: StringNullableFilter<"Ticket"> | string | null
    counter?: XOR<CounterNullableScalarRelationFilter, CounterWhereInput> | null
    servicedByStaff?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    notificationLogs?: NotificationLogListRelationFilter
  }

  export type TicketOrderByWithRelationInput = {
    id?: SortOrder
    ticketNumber?: SortOrder
    customerName?: SortOrder
    phoneNumber?: SortOrder
    preferredChannel?: SortOrder
    status?: SortOrder
    initialPosition?: SortOrder
    currentPosition?: SortOrder
    estimatedWaitTimeMinutes?: SortOrder
    skipCount?: SortOrder
    joinedAt?: SortOrder
    calledAt?: SortOrderInput | SortOrder
    servicedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    skippedAt?: SortOrderInput | SortOrder
    cancelledAt?: SortOrderInput | SortOrder
    counterId?: SortOrderInput | SortOrder
    servicedByStaffId?: SortOrderInput | SortOrder
    counter?: CounterOrderByWithRelationInput
    servicedByStaff?: UserOrderByWithRelationInput
    notificationLogs?: NotificationLogOrderByRelationAggregateInput
  }

  export type TicketWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TicketWhereInput | TicketWhereInput[]
    OR?: TicketWhereInput[]
    NOT?: TicketWhereInput | TicketWhereInput[]
    ticketNumber?: StringFilter<"Ticket"> | string
    customerName?: StringFilter<"Ticket"> | string
    phoneNumber?: StringFilter<"Ticket"> | string
    preferredChannel?: EnumNotificationChannelFilter<"Ticket"> | $Enums.NotificationChannel
    status?: EnumTicketStatusFilter<"Ticket"> | $Enums.TicketStatus
    initialPosition?: IntFilter<"Ticket"> | number
    currentPosition?: IntFilter<"Ticket"> | number
    estimatedWaitTimeMinutes?: IntFilter<"Ticket"> | number
    skipCount?: IntFilter<"Ticket"> | number
    joinedAt?: DateTimeFilter<"Ticket"> | Date | string
    calledAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    servicedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    skippedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    cancelledAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    counterId?: StringNullableFilter<"Ticket"> | string | null
    servicedByStaffId?: StringNullableFilter<"Ticket"> | string | null
    counter?: XOR<CounterNullableScalarRelationFilter, CounterWhereInput> | null
    servicedByStaff?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    notificationLogs?: NotificationLogListRelationFilter
  }, "id">

  export type TicketOrderByWithAggregationInput = {
    id?: SortOrder
    ticketNumber?: SortOrder
    customerName?: SortOrder
    phoneNumber?: SortOrder
    preferredChannel?: SortOrder
    status?: SortOrder
    initialPosition?: SortOrder
    currentPosition?: SortOrder
    estimatedWaitTimeMinutes?: SortOrder
    skipCount?: SortOrder
    joinedAt?: SortOrder
    calledAt?: SortOrderInput | SortOrder
    servicedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    skippedAt?: SortOrderInput | SortOrder
    cancelledAt?: SortOrderInput | SortOrder
    counterId?: SortOrderInput | SortOrder
    servicedByStaffId?: SortOrderInput | SortOrder
    _count?: TicketCountOrderByAggregateInput
    _avg?: TicketAvgOrderByAggregateInput
    _max?: TicketMaxOrderByAggregateInput
    _min?: TicketMinOrderByAggregateInput
    _sum?: TicketSumOrderByAggregateInput
  }

  export type TicketScalarWhereWithAggregatesInput = {
    AND?: TicketScalarWhereWithAggregatesInput | TicketScalarWhereWithAggregatesInput[]
    OR?: TicketScalarWhereWithAggregatesInput[]
    NOT?: TicketScalarWhereWithAggregatesInput | TicketScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Ticket"> | string
    ticketNumber?: StringWithAggregatesFilter<"Ticket"> | string
    customerName?: StringWithAggregatesFilter<"Ticket"> | string
    phoneNumber?: StringWithAggregatesFilter<"Ticket"> | string
    preferredChannel?: EnumNotificationChannelWithAggregatesFilter<"Ticket"> | $Enums.NotificationChannel
    status?: EnumTicketStatusWithAggregatesFilter<"Ticket"> | $Enums.TicketStatus
    initialPosition?: IntWithAggregatesFilter<"Ticket"> | number
    currentPosition?: IntWithAggregatesFilter<"Ticket"> | number
    estimatedWaitTimeMinutes?: IntWithAggregatesFilter<"Ticket"> | number
    skipCount?: IntWithAggregatesFilter<"Ticket"> | number
    joinedAt?: DateTimeWithAggregatesFilter<"Ticket"> | Date | string
    calledAt?: DateTimeNullableWithAggregatesFilter<"Ticket"> | Date | string | null
    servicedAt?: DateTimeNullableWithAggregatesFilter<"Ticket"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"Ticket"> | Date | string | null
    skippedAt?: DateTimeNullableWithAggregatesFilter<"Ticket"> | Date | string | null
    cancelledAt?: DateTimeNullableWithAggregatesFilter<"Ticket"> | Date | string | null
    counterId?: StringNullableWithAggregatesFilter<"Ticket"> | string | null
    servicedByStaffId?: StringNullableWithAggregatesFilter<"Ticket"> | string | null
  }

  export type NotificationLogWhereInput = {
    AND?: NotificationLogWhereInput | NotificationLogWhereInput[]
    OR?: NotificationLogWhereInput[]
    NOT?: NotificationLogWhereInput | NotificationLogWhereInput[]
    id?: StringFilter<"NotificationLog"> | string
    ticketId?: StringFilter<"NotificationLog"> | string
    channel?: EnumNotificationChannelFilter<"NotificationLog"> | $Enums.NotificationChannel
    trigger?: EnumNotificationTriggerFilter<"NotificationLog"> | $Enums.NotificationTrigger
    message?: StringFilter<"NotificationLog"> | string
    sentAt?: DateTimeFilter<"NotificationLog"> | Date | string
    ticket?: XOR<TicketScalarRelationFilter, TicketWhereInput>
  }

  export type NotificationLogOrderByWithRelationInput = {
    id?: SortOrder
    ticketId?: SortOrder
    channel?: SortOrder
    trigger?: SortOrder
    message?: SortOrder
    sentAt?: SortOrder
    ticket?: TicketOrderByWithRelationInput
  }

  export type NotificationLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationLogWhereInput | NotificationLogWhereInput[]
    OR?: NotificationLogWhereInput[]
    NOT?: NotificationLogWhereInput | NotificationLogWhereInput[]
    ticketId?: StringFilter<"NotificationLog"> | string
    channel?: EnumNotificationChannelFilter<"NotificationLog"> | $Enums.NotificationChannel
    trigger?: EnumNotificationTriggerFilter<"NotificationLog"> | $Enums.NotificationTrigger
    message?: StringFilter<"NotificationLog"> | string
    sentAt?: DateTimeFilter<"NotificationLog"> | Date | string
    ticket?: XOR<TicketScalarRelationFilter, TicketWhereInput>
  }, "id">

  export type NotificationLogOrderByWithAggregationInput = {
    id?: SortOrder
    ticketId?: SortOrder
    channel?: SortOrder
    trigger?: SortOrder
    message?: SortOrder
    sentAt?: SortOrder
    _count?: NotificationLogCountOrderByAggregateInput
    _max?: NotificationLogMaxOrderByAggregateInput
    _min?: NotificationLogMinOrderByAggregateInput
  }

  export type NotificationLogScalarWhereWithAggregatesInput = {
    AND?: NotificationLogScalarWhereWithAggregatesInput | NotificationLogScalarWhereWithAggregatesInput[]
    OR?: NotificationLogScalarWhereWithAggregatesInput[]
    NOT?: NotificationLogScalarWhereWithAggregatesInput | NotificationLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NotificationLog"> | string
    ticketId?: StringWithAggregatesFilter<"NotificationLog"> | string
    channel?: EnumNotificationChannelWithAggregatesFilter<"NotificationLog"> | $Enums.NotificationChannel
    trigger?: EnumNotificationTriggerWithAggregatesFilter<"NotificationLog"> | $Enums.NotificationTrigger
    message?: StringWithAggregatesFilter<"NotificationLog"> | string
    sentAt?: DateTimeWithAggregatesFilter<"NotificationLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    employeeId: string
    fullName: string
    passwordHash: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    activeCounter?: CounterCreateNestedOneWithoutCurrentStaffInput
    servicedTickets?: TicketCreateNestedManyWithoutServicedByStaffInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    employeeId: string
    fullName: string
    passwordHash: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    activeCounter?: CounterUncheckedCreateNestedOneWithoutCurrentStaffInput
    servicedTickets?: TicketUncheckedCreateNestedManyWithoutServicedByStaffInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeCounter?: CounterUpdateOneWithoutCurrentStaffNestedInput
    servicedTickets?: TicketUpdateManyWithoutServicedByStaffNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeCounter?: CounterUncheckedUpdateOneWithoutCurrentStaffNestedInput
    servicedTickets?: TicketUncheckedUpdateManyWithoutServicedByStaffNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    employeeId: string
    fullName: string
    passwordHash: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CounterCreateInput = {
    id?: string
    counterNumber: number
    counterName: string
    isActive?: boolean
    updatedAt?: Date | string
    currentStaff?: UserCreateNestedOneWithoutActiveCounterInput
    tickets?: TicketCreateNestedManyWithoutCounterInput
  }

  export type CounterUncheckedCreateInput = {
    id?: string
    counterNumber: number
    counterName: string
    isActive?: boolean
    updatedAt?: Date | string
    currentStaffId?: string | null
    tickets?: TicketUncheckedCreateNestedManyWithoutCounterInput
  }

  export type CounterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    counterNumber?: IntFieldUpdateOperationsInput | number
    counterName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentStaff?: UserUpdateOneWithoutActiveCounterNestedInput
    tickets?: TicketUpdateManyWithoutCounterNestedInput
  }

  export type CounterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    counterNumber?: IntFieldUpdateOperationsInput | number
    counterName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentStaffId?: NullableStringFieldUpdateOperationsInput | string | null
    tickets?: TicketUncheckedUpdateManyWithoutCounterNestedInput
  }

  export type CounterCreateManyInput = {
    id?: string
    counterNumber: number
    counterName: string
    isActive?: boolean
    updatedAt?: Date | string
    currentStaffId?: string | null
  }

  export type CounterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    counterNumber?: IntFieldUpdateOperationsInput | number
    counterName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CounterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    counterNumber?: IntFieldUpdateOperationsInput | number
    counterName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentStaffId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TicketCreateInput = {
    id?: string
    ticketNumber: string
    customerName: string
    phoneNumber: string
    preferredChannel?: $Enums.NotificationChannel
    status?: $Enums.TicketStatus
    initialPosition: number
    currentPosition: number
    estimatedWaitTimeMinutes?: number
    skipCount?: number
    joinedAt?: Date | string
    calledAt?: Date | string | null
    servicedAt?: Date | string | null
    completedAt?: Date | string | null
    skippedAt?: Date | string | null
    cancelledAt?: Date | string | null
    counter?: CounterCreateNestedOneWithoutTicketsInput
    servicedByStaff?: UserCreateNestedOneWithoutServicedTicketsInput
    notificationLogs?: NotificationLogCreateNestedManyWithoutTicketInput
  }

  export type TicketUncheckedCreateInput = {
    id?: string
    ticketNumber: string
    customerName: string
    phoneNumber: string
    preferredChannel?: $Enums.NotificationChannel
    status?: $Enums.TicketStatus
    initialPosition: number
    currentPosition: number
    estimatedWaitTimeMinutes?: number
    skipCount?: number
    joinedAt?: Date | string
    calledAt?: Date | string | null
    servicedAt?: Date | string | null
    completedAt?: Date | string | null
    skippedAt?: Date | string | null
    cancelledAt?: Date | string | null
    counterId?: string | null
    servicedByStaffId?: string | null
    notificationLogs?: NotificationLogUncheckedCreateNestedManyWithoutTicketInput
  }

  export type TicketUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketNumber?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    preferredChannel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    initialPosition?: IntFieldUpdateOperationsInput | number
    currentPosition?: IntFieldUpdateOperationsInput | number
    estimatedWaitTimeMinutes?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    counter?: CounterUpdateOneWithoutTicketsNestedInput
    servicedByStaff?: UserUpdateOneWithoutServicedTicketsNestedInput
    notificationLogs?: NotificationLogUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketNumber?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    preferredChannel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    initialPosition?: IntFieldUpdateOperationsInput | number
    currentPosition?: IntFieldUpdateOperationsInput | number
    estimatedWaitTimeMinutes?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    counterId?: NullableStringFieldUpdateOperationsInput | string | null
    servicedByStaffId?: NullableStringFieldUpdateOperationsInput | string | null
    notificationLogs?: NotificationLogUncheckedUpdateManyWithoutTicketNestedInput
  }

  export type TicketCreateManyInput = {
    id?: string
    ticketNumber: string
    customerName: string
    phoneNumber: string
    preferredChannel?: $Enums.NotificationChannel
    status?: $Enums.TicketStatus
    initialPosition: number
    currentPosition: number
    estimatedWaitTimeMinutes?: number
    skipCount?: number
    joinedAt?: Date | string
    calledAt?: Date | string | null
    servicedAt?: Date | string | null
    completedAt?: Date | string | null
    skippedAt?: Date | string | null
    cancelledAt?: Date | string | null
    counterId?: string | null
    servicedByStaffId?: string | null
  }

  export type TicketUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketNumber?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    preferredChannel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    initialPosition?: IntFieldUpdateOperationsInput | number
    currentPosition?: IntFieldUpdateOperationsInput | number
    estimatedWaitTimeMinutes?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TicketUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketNumber?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    preferredChannel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    initialPosition?: IntFieldUpdateOperationsInput | number
    currentPosition?: IntFieldUpdateOperationsInput | number
    estimatedWaitTimeMinutes?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    counterId?: NullableStringFieldUpdateOperationsInput | string | null
    servicedByStaffId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NotificationLogCreateInput = {
    id?: string
    channel: $Enums.NotificationChannel
    trigger: $Enums.NotificationTrigger
    message: string
    sentAt?: Date | string
    ticket: TicketCreateNestedOneWithoutNotificationLogsInput
  }

  export type NotificationLogUncheckedCreateInput = {
    id?: string
    ticketId: string
    channel: $Enums.NotificationChannel
    trigger: $Enums.NotificationTrigger
    message: string
    sentAt?: Date | string
  }

  export type NotificationLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    trigger?: EnumNotificationTriggerFieldUpdateOperationsInput | $Enums.NotificationTrigger
    message?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ticket?: TicketUpdateOneRequiredWithoutNotificationLogsNestedInput
  }

  export type NotificationLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketId?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    trigger?: EnumNotificationTriggerFieldUpdateOperationsInput | $Enums.NotificationTrigger
    message?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationLogCreateManyInput = {
    id?: string
    ticketId: string
    channel: $Enums.NotificationChannel
    trigger: $Enums.NotificationTrigger
    message: string
    sentAt?: Date | string
  }

  export type NotificationLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    trigger?: EnumNotificationTriggerFieldUpdateOperationsInput | $Enums.NotificationTrigger
    message?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketId?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    trigger?: EnumNotificationTriggerFieldUpdateOperationsInput | $Enums.NotificationTrigger
    message?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CounterNullableScalarRelationFilter = {
    is?: CounterWhereInput | null
    isNot?: CounterWhereInput | null
  }

  export type TicketListRelationFilter = {
    every?: TicketWhereInput
    some?: TicketWhereInput
    none?: TicketWhereInput
  }

  export type TicketOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    fullName?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    fullName?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    fullName?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CounterCountOrderByAggregateInput = {
    id?: SortOrder
    counterNumber?: SortOrder
    counterName?: SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
    currentStaffId?: SortOrder
  }

  export type CounterAvgOrderByAggregateInput = {
    counterNumber?: SortOrder
  }

  export type CounterMaxOrderByAggregateInput = {
    id?: SortOrder
    counterNumber?: SortOrder
    counterName?: SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
    currentStaffId?: SortOrder
  }

  export type CounterMinOrderByAggregateInput = {
    id?: SortOrder
    counterNumber?: SortOrder
    counterName?: SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
    currentStaffId?: SortOrder
  }

  export type CounterSumOrderByAggregateInput = {
    counterNumber?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumNotificationChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | EnumNotificationChannelFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationChannelFilter<$PrismaModel> | $Enums.NotificationChannel
  }

  export type EnumTicketStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusFilter<$PrismaModel> | $Enums.TicketStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NotificationLogListRelationFilter = {
    every?: NotificationLogWhereInput
    some?: NotificationLogWhereInput
    none?: NotificationLogWhereInput
  }

  export type NotificationLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TicketCountOrderByAggregateInput = {
    id?: SortOrder
    ticketNumber?: SortOrder
    customerName?: SortOrder
    phoneNumber?: SortOrder
    preferredChannel?: SortOrder
    status?: SortOrder
    initialPosition?: SortOrder
    currentPosition?: SortOrder
    estimatedWaitTimeMinutes?: SortOrder
    skipCount?: SortOrder
    joinedAt?: SortOrder
    calledAt?: SortOrder
    servicedAt?: SortOrder
    completedAt?: SortOrder
    skippedAt?: SortOrder
    cancelledAt?: SortOrder
    counterId?: SortOrder
    servicedByStaffId?: SortOrder
  }

  export type TicketAvgOrderByAggregateInput = {
    initialPosition?: SortOrder
    currentPosition?: SortOrder
    estimatedWaitTimeMinutes?: SortOrder
    skipCount?: SortOrder
  }

  export type TicketMaxOrderByAggregateInput = {
    id?: SortOrder
    ticketNumber?: SortOrder
    customerName?: SortOrder
    phoneNumber?: SortOrder
    preferredChannel?: SortOrder
    status?: SortOrder
    initialPosition?: SortOrder
    currentPosition?: SortOrder
    estimatedWaitTimeMinutes?: SortOrder
    skipCount?: SortOrder
    joinedAt?: SortOrder
    calledAt?: SortOrder
    servicedAt?: SortOrder
    completedAt?: SortOrder
    skippedAt?: SortOrder
    cancelledAt?: SortOrder
    counterId?: SortOrder
    servicedByStaffId?: SortOrder
  }

  export type TicketMinOrderByAggregateInput = {
    id?: SortOrder
    ticketNumber?: SortOrder
    customerName?: SortOrder
    phoneNumber?: SortOrder
    preferredChannel?: SortOrder
    status?: SortOrder
    initialPosition?: SortOrder
    currentPosition?: SortOrder
    estimatedWaitTimeMinutes?: SortOrder
    skipCount?: SortOrder
    joinedAt?: SortOrder
    calledAt?: SortOrder
    servicedAt?: SortOrder
    completedAt?: SortOrder
    skippedAt?: SortOrder
    cancelledAt?: SortOrder
    counterId?: SortOrder
    servicedByStaffId?: SortOrder
  }

  export type TicketSumOrderByAggregateInput = {
    initialPosition?: SortOrder
    currentPosition?: SortOrder
    estimatedWaitTimeMinutes?: SortOrder
    skipCount?: SortOrder
  }

  export type EnumNotificationChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | EnumNotificationChannelFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationChannelWithAggregatesFilter<$PrismaModel> | $Enums.NotificationChannel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationChannelFilter<$PrismaModel>
    _max?: NestedEnumNotificationChannelFilter<$PrismaModel>
  }

  export type EnumTicketStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel> | $Enums.TicketStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketStatusFilter<$PrismaModel>
    _max?: NestedEnumTicketStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumNotificationTriggerFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationTrigger | EnumNotificationTriggerFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationTrigger[] | ListEnumNotificationTriggerFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationTrigger[] | ListEnumNotificationTriggerFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTriggerFilter<$PrismaModel> | $Enums.NotificationTrigger
  }

  export type TicketScalarRelationFilter = {
    is?: TicketWhereInput
    isNot?: TicketWhereInput
  }

  export type NotificationLogCountOrderByAggregateInput = {
    id?: SortOrder
    ticketId?: SortOrder
    channel?: SortOrder
    trigger?: SortOrder
    message?: SortOrder
    sentAt?: SortOrder
  }

  export type NotificationLogMaxOrderByAggregateInput = {
    id?: SortOrder
    ticketId?: SortOrder
    channel?: SortOrder
    trigger?: SortOrder
    message?: SortOrder
    sentAt?: SortOrder
  }

  export type NotificationLogMinOrderByAggregateInput = {
    id?: SortOrder
    ticketId?: SortOrder
    channel?: SortOrder
    trigger?: SortOrder
    message?: SortOrder
    sentAt?: SortOrder
  }

  export type EnumNotificationTriggerWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationTrigger | EnumNotificationTriggerFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationTrigger[] | ListEnumNotificationTriggerFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationTrigger[] | ListEnumNotificationTriggerFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTriggerWithAggregatesFilter<$PrismaModel> | $Enums.NotificationTrigger
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTriggerFilter<$PrismaModel>
    _max?: NestedEnumNotificationTriggerFilter<$PrismaModel>
  }

  export type CounterCreateNestedOneWithoutCurrentStaffInput = {
    create?: XOR<CounterCreateWithoutCurrentStaffInput, CounterUncheckedCreateWithoutCurrentStaffInput>
    connectOrCreate?: CounterCreateOrConnectWithoutCurrentStaffInput
    connect?: CounterWhereUniqueInput
  }

  export type TicketCreateNestedManyWithoutServicedByStaffInput = {
    create?: XOR<TicketCreateWithoutServicedByStaffInput, TicketUncheckedCreateWithoutServicedByStaffInput> | TicketCreateWithoutServicedByStaffInput[] | TicketUncheckedCreateWithoutServicedByStaffInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutServicedByStaffInput | TicketCreateOrConnectWithoutServicedByStaffInput[]
    createMany?: TicketCreateManyServicedByStaffInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type CounterUncheckedCreateNestedOneWithoutCurrentStaffInput = {
    create?: XOR<CounterCreateWithoutCurrentStaffInput, CounterUncheckedCreateWithoutCurrentStaffInput>
    connectOrCreate?: CounterCreateOrConnectWithoutCurrentStaffInput
    connect?: CounterWhereUniqueInput
  }

  export type TicketUncheckedCreateNestedManyWithoutServicedByStaffInput = {
    create?: XOR<TicketCreateWithoutServicedByStaffInput, TicketUncheckedCreateWithoutServicedByStaffInput> | TicketCreateWithoutServicedByStaffInput[] | TicketUncheckedCreateWithoutServicedByStaffInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutServicedByStaffInput | TicketCreateOrConnectWithoutServicedByStaffInput[]
    createMany?: TicketCreateManyServicedByStaffInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CounterUpdateOneWithoutCurrentStaffNestedInput = {
    create?: XOR<CounterCreateWithoutCurrentStaffInput, CounterUncheckedCreateWithoutCurrentStaffInput>
    connectOrCreate?: CounterCreateOrConnectWithoutCurrentStaffInput
    upsert?: CounterUpsertWithoutCurrentStaffInput
    disconnect?: CounterWhereInput | boolean
    delete?: CounterWhereInput | boolean
    connect?: CounterWhereUniqueInput
    update?: XOR<XOR<CounterUpdateToOneWithWhereWithoutCurrentStaffInput, CounterUpdateWithoutCurrentStaffInput>, CounterUncheckedUpdateWithoutCurrentStaffInput>
  }

  export type TicketUpdateManyWithoutServicedByStaffNestedInput = {
    create?: XOR<TicketCreateWithoutServicedByStaffInput, TicketUncheckedCreateWithoutServicedByStaffInput> | TicketCreateWithoutServicedByStaffInput[] | TicketUncheckedCreateWithoutServicedByStaffInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutServicedByStaffInput | TicketCreateOrConnectWithoutServicedByStaffInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutServicedByStaffInput | TicketUpsertWithWhereUniqueWithoutServicedByStaffInput[]
    createMany?: TicketCreateManyServicedByStaffInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutServicedByStaffInput | TicketUpdateWithWhereUniqueWithoutServicedByStaffInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutServicedByStaffInput | TicketUpdateManyWithWhereWithoutServicedByStaffInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type CounterUncheckedUpdateOneWithoutCurrentStaffNestedInput = {
    create?: XOR<CounterCreateWithoutCurrentStaffInput, CounterUncheckedCreateWithoutCurrentStaffInput>
    connectOrCreate?: CounterCreateOrConnectWithoutCurrentStaffInput
    upsert?: CounterUpsertWithoutCurrentStaffInput
    disconnect?: CounterWhereInput | boolean
    delete?: CounterWhereInput | boolean
    connect?: CounterWhereUniqueInput
    update?: XOR<XOR<CounterUpdateToOneWithWhereWithoutCurrentStaffInput, CounterUpdateWithoutCurrentStaffInput>, CounterUncheckedUpdateWithoutCurrentStaffInput>
  }

  export type TicketUncheckedUpdateManyWithoutServicedByStaffNestedInput = {
    create?: XOR<TicketCreateWithoutServicedByStaffInput, TicketUncheckedCreateWithoutServicedByStaffInput> | TicketCreateWithoutServicedByStaffInput[] | TicketUncheckedCreateWithoutServicedByStaffInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutServicedByStaffInput | TicketCreateOrConnectWithoutServicedByStaffInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutServicedByStaffInput | TicketUpsertWithWhereUniqueWithoutServicedByStaffInput[]
    createMany?: TicketCreateManyServicedByStaffInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutServicedByStaffInput | TicketUpdateWithWhereUniqueWithoutServicedByStaffInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutServicedByStaffInput | TicketUpdateManyWithWhereWithoutServicedByStaffInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutActiveCounterInput = {
    create?: XOR<UserCreateWithoutActiveCounterInput, UserUncheckedCreateWithoutActiveCounterInput>
    connectOrCreate?: UserCreateOrConnectWithoutActiveCounterInput
    connect?: UserWhereUniqueInput
  }

  export type TicketCreateNestedManyWithoutCounterInput = {
    create?: XOR<TicketCreateWithoutCounterInput, TicketUncheckedCreateWithoutCounterInput> | TicketCreateWithoutCounterInput[] | TicketUncheckedCreateWithoutCounterInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutCounterInput | TicketCreateOrConnectWithoutCounterInput[]
    createMany?: TicketCreateManyCounterInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TicketUncheckedCreateNestedManyWithoutCounterInput = {
    create?: XOR<TicketCreateWithoutCounterInput, TicketUncheckedCreateWithoutCounterInput> | TicketCreateWithoutCounterInput[] | TicketUncheckedCreateWithoutCounterInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutCounterInput | TicketCreateOrConnectWithoutCounterInput[]
    createMany?: TicketCreateManyCounterInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneWithoutActiveCounterNestedInput = {
    create?: XOR<UserCreateWithoutActiveCounterInput, UserUncheckedCreateWithoutActiveCounterInput>
    connectOrCreate?: UserCreateOrConnectWithoutActiveCounterInput
    upsert?: UserUpsertWithoutActiveCounterInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActiveCounterInput, UserUpdateWithoutActiveCounterInput>, UserUncheckedUpdateWithoutActiveCounterInput>
  }

  export type TicketUpdateManyWithoutCounterNestedInput = {
    create?: XOR<TicketCreateWithoutCounterInput, TicketUncheckedCreateWithoutCounterInput> | TicketCreateWithoutCounterInput[] | TicketUncheckedCreateWithoutCounterInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutCounterInput | TicketCreateOrConnectWithoutCounterInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutCounterInput | TicketUpsertWithWhereUniqueWithoutCounterInput[]
    createMany?: TicketCreateManyCounterInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutCounterInput | TicketUpdateWithWhereUniqueWithoutCounterInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutCounterInput | TicketUpdateManyWithWhereWithoutCounterInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type TicketUncheckedUpdateManyWithoutCounterNestedInput = {
    create?: XOR<TicketCreateWithoutCounterInput, TicketUncheckedCreateWithoutCounterInput> | TicketCreateWithoutCounterInput[] | TicketUncheckedCreateWithoutCounterInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutCounterInput | TicketCreateOrConnectWithoutCounterInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutCounterInput | TicketUpsertWithWhereUniqueWithoutCounterInput[]
    createMany?: TicketCreateManyCounterInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutCounterInput | TicketUpdateWithWhereUniqueWithoutCounterInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutCounterInput | TicketUpdateManyWithWhereWithoutCounterInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type CounterCreateNestedOneWithoutTicketsInput = {
    create?: XOR<CounterCreateWithoutTicketsInput, CounterUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: CounterCreateOrConnectWithoutTicketsInput
    connect?: CounterWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutServicedTicketsInput = {
    create?: XOR<UserCreateWithoutServicedTicketsInput, UserUncheckedCreateWithoutServicedTicketsInput>
    connectOrCreate?: UserCreateOrConnectWithoutServicedTicketsInput
    connect?: UserWhereUniqueInput
  }

  export type NotificationLogCreateNestedManyWithoutTicketInput = {
    create?: XOR<NotificationLogCreateWithoutTicketInput, NotificationLogUncheckedCreateWithoutTicketInput> | NotificationLogCreateWithoutTicketInput[] | NotificationLogUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: NotificationLogCreateOrConnectWithoutTicketInput | NotificationLogCreateOrConnectWithoutTicketInput[]
    createMany?: NotificationLogCreateManyTicketInputEnvelope
    connect?: NotificationLogWhereUniqueInput | NotificationLogWhereUniqueInput[]
  }

  export type NotificationLogUncheckedCreateNestedManyWithoutTicketInput = {
    create?: XOR<NotificationLogCreateWithoutTicketInput, NotificationLogUncheckedCreateWithoutTicketInput> | NotificationLogCreateWithoutTicketInput[] | NotificationLogUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: NotificationLogCreateOrConnectWithoutTicketInput | NotificationLogCreateOrConnectWithoutTicketInput[]
    createMany?: NotificationLogCreateManyTicketInputEnvelope
    connect?: NotificationLogWhereUniqueInput | NotificationLogWhereUniqueInput[]
  }

  export type EnumNotificationChannelFieldUpdateOperationsInput = {
    set?: $Enums.NotificationChannel
  }

  export type EnumTicketStatusFieldUpdateOperationsInput = {
    set?: $Enums.TicketStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CounterUpdateOneWithoutTicketsNestedInput = {
    create?: XOR<CounterCreateWithoutTicketsInput, CounterUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: CounterCreateOrConnectWithoutTicketsInput
    upsert?: CounterUpsertWithoutTicketsInput
    disconnect?: CounterWhereInput | boolean
    delete?: CounterWhereInput | boolean
    connect?: CounterWhereUniqueInput
    update?: XOR<XOR<CounterUpdateToOneWithWhereWithoutTicketsInput, CounterUpdateWithoutTicketsInput>, CounterUncheckedUpdateWithoutTicketsInput>
  }

  export type UserUpdateOneWithoutServicedTicketsNestedInput = {
    create?: XOR<UserCreateWithoutServicedTicketsInput, UserUncheckedCreateWithoutServicedTicketsInput>
    connectOrCreate?: UserCreateOrConnectWithoutServicedTicketsInput
    upsert?: UserUpsertWithoutServicedTicketsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutServicedTicketsInput, UserUpdateWithoutServicedTicketsInput>, UserUncheckedUpdateWithoutServicedTicketsInput>
  }

  export type NotificationLogUpdateManyWithoutTicketNestedInput = {
    create?: XOR<NotificationLogCreateWithoutTicketInput, NotificationLogUncheckedCreateWithoutTicketInput> | NotificationLogCreateWithoutTicketInput[] | NotificationLogUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: NotificationLogCreateOrConnectWithoutTicketInput | NotificationLogCreateOrConnectWithoutTicketInput[]
    upsert?: NotificationLogUpsertWithWhereUniqueWithoutTicketInput | NotificationLogUpsertWithWhereUniqueWithoutTicketInput[]
    createMany?: NotificationLogCreateManyTicketInputEnvelope
    set?: NotificationLogWhereUniqueInput | NotificationLogWhereUniqueInput[]
    disconnect?: NotificationLogWhereUniqueInput | NotificationLogWhereUniqueInput[]
    delete?: NotificationLogWhereUniqueInput | NotificationLogWhereUniqueInput[]
    connect?: NotificationLogWhereUniqueInput | NotificationLogWhereUniqueInput[]
    update?: NotificationLogUpdateWithWhereUniqueWithoutTicketInput | NotificationLogUpdateWithWhereUniqueWithoutTicketInput[]
    updateMany?: NotificationLogUpdateManyWithWhereWithoutTicketInput | NotificationLogUpdateManyWithWhereWithoutTicketInput[]
    deleteMany?: NotificationLogScalarWhereInput | NotificationLogScalarWhereInput[]
  }

  export type NotificationLogUncheckedUpdateManyWithoutTicketNestedInput = {
    create?: XOR<NotificationLogCreateWithoutTicketInput, NotificationLogUncheckedCreateWithoutTicketInput> | NotificationLogCreateWithoutTicketInput[] | NotificationLogUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: NotificationLogCreateOrConnectWithoutTicketInput | NotificationLogCreateOrConnectWithoutTicketInput[]
    upsert?: NotificationLogUpsertWithWhereUniqueWithoutTicketInput | NotificationLogUpsertWithWhereUniqueWithoutTicketInput[]
    createMany?: NotificationLogCreateManyTicketInputEnvelope
    set?: NotificationLogWhereUniqueInput | NotificationLogWhereUniqueInput[]
    disconnect?: NotificationLogWhereUniqueInput | NotificationLogWhereUniqueInput[]
    delete?: NotificationLogWhereUniqueInput | NotificationLogWhereUniqueInput[]
    connect?: NotificationLogWhereUniqueInput | NotificationLogWhereUniqueInput[]
    update?: NotificationLogUpdateWithWhereUniqueWithoutTicketInput | NotificationLogUpdateWithWhereUniqueWithoutTicketInput[]
    updateMany?: NotificationLogUpdateManyWithWhereWithoutTicketInput | NotificationLogUpdateManyWithWhereWithoutTicketInput[]
    deleteMany?: NotificationLogScalarWhereInput | NotificationLogScalarWhereInput[]
  }

  export type TicketCreateNestedOneWithoutNotificationLogsInput = {
    create?: XOR<TicketCreateWithoutNotificationLogsInput, TicketUncheckedCreateWithoutNotificationLogsInput>
    connectOrCreate?: TicketCreateOrConnectWithoutNotificationLogsInput
    connect?: TicketWhereUniqueInput
  }

  export type EnumNotificationTriggerFieldUpdateOperationsInput = {
    set?: $Enums.NotificationTrigger
  }

  export type TicketUpdateOneRequiredWithoutNotificationLogsNestedInput = {
    create?: XOR<TicketCreateWithoutNotificationLogsInput, TicketUncheckedCreateWithoutNotificationLogsInput>
    connectOrCreate?: TicketCreateOrConnectWithoutNotificationLogsInput
    upsert?: TicketUpsertWithoutNotificationLogsInput
    connect?: TicketWhereUniqueInput
    update?: XOR<XOR<TicketUpdateToOneWithWhereWithoutNotificationLogsInput, TicketUpdateWithoutNotificationLogsInput>, TicketUncheckedUpdateWithoutNotificationLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumNotificationChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | EnumNotificationChannelFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationChannelFilter<$PrismaModel> | $Enums.NotificationChannel
  }

  export type NestedEnumTicketStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusFilter<$PrismaModel> | $Enums.TicketStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumNotificationChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | EnumNotificationChannelFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationChannelWithAggregatesFilter<$PrismaModel> | $Enums.NotificationChannel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationChannelFilter<$PrismaModel>
    _max?: NestedEnumNotificationChannelFilter<$PrismaModel>
  }

  export type NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel> | $Enums.TicketStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketStatusFilter<$PrismaModel>
    _max?: NestedEnumTicketStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumNotificationTriggerFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationTrigger | EnumNotificationTriggerFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationTrigger[] | ListEnumNotificationTriggerFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationTrigger[] | ListEnumNotificationTriggerFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTriggerFilter<$PrismaModel> | $Enums.NotificationTrigger
  }

  export type NestedEnumNotificationTriggerWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationTrigger | EnumNotificationTriggerFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationTrigger[] | ListEnumNotificationTriggerFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationTrigger[] | ListEnumNotificationTriggerFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTriggerWithAggregatesFilter<$PrismaModel> | $Enums.NotificationTrigger
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTriggerFilter<$PrismaModel>
    _max?: NestedEnumNotificationTriggerFilter<$PrismaModel>
  }

  export type CounterCreateWithoutCurrentStaffInput = {
    id?: string
    counterNumber: number
    counterName: string
    isActive?: boolean
    updatedAt?: Date | string
    tickets?: TicketCreateNestedManyWithoutCounterInput
  }

  export type CounterUncheckedCreateWithoutCurrentStaffInput = {
    id?: string
    counterNumber: number
    counterName: string
    isActive?: boolean
    updatedAt?: Date | string
    tickets?: TicketUncheckedCreateNestedManyWithoutCounterInput
  }

  export type CounterCreateOrConnectWithoutCurrentStaffInput = {
    where: CounterWhereUniqueInput
    create: XOR<CounterCreateWithoutCurrentStaffInput, CounterUncheckedCreateWithoutCurrentStaffInput>
  }

  export type TicketCreateWithoutServicedByStaffInput = {
    id?: string
    ticketNumber: string
    customerName: string
    phoneNumber: string
    preferredChannel?: $Enums.NotificationChannel
    status?: $Enums.TicketStatus
    initialPosition: number
    currentPosition: number
    estimatedWaitTimeMinutes?: number
    skipCount?: number
    joinedAt?: Date | string
    calledAt?: Date | string | null
    servicedAt?: Date | string | null
    completedAt?: Date | string | null
    skippedAt?: Date | string | null
    cancelledAt?: Date | string | null
    counter?: CounterCreateNestedOneWithoutTicketsInput
    notificationLogs?: NotificationLogCreateNestedManyWithoutTicketInput
  }

  export type TicketUncheckedCreateWithoutServicedByStaffInput = {
    id?: string
    ticketNumber: string
    customerName: string
    phoneNumber: string
    preferredChannel?: $Enums.NotificationChannel
    status?: $Enums.TicketStatus
    initialPosition: number
    currentPosition: number
    estimatedWaitTimeMinutes?: number
    skipCount?: number
    joinedAt?: Date | string
    calledAt?: Date | string | null
    servicedAt?: Date | string | null
    completedAt?: Date | string | null
    skippedAt?: Date | string | null
    cancelledAt?: Date | string | null
    counterId?: string | null
    notificationLogs?: NotificationLogUncheckedCreateNestedManyWithoutTicketInput
  }

  export type TicketCreateOrConnectWithoutServicedByStaffInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutServicedByStaffInput, TicketUncheckedCreateWithoutServicedByStaffInput>
  }

  export type TicketCreateManyServicedByStaffInputEnvelope = {
    data: TicketCreateManyServicedByStaffInput | TicketCreateManyServicedByStaffInput[]
    skipDuplicates?: boolean
  }

  export type CounterUpsertWithoutCurrentStaffInput = {
    update: XOR<CounterUpdateWithoutCurrentStaffInput, CounterUncheckedUpdateWithoutCurrentStaffInput>
    create: XOR<CounterCreateWithoutCurrentStaffInput, CounterUncheckedCreateWithoutCurrentStaffInput>
    where?: CounterWhereInput
  }

  export type CounterUpdateToOneWithWhereWithoutCurrentStaffInput = {
    where?: CounterWhereInput
    data: XOR<CounterUpdateWithoutCurrentStaffInput, CounterUncheckedUpdateWithoutCurrentStaffInput>
  }

  export type CounterUpdateWithoutCurrentStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    counterNumber?: IntFieldUpdateOperationsInput | number
    counterName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tickets?: TicketUpdateManyWithoutCounterNestedInput
  }

  export type CounterUncheckedUpdateWithoutCurrentStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    counterNumber?: IntFieldUpdateOperationsInput | number
    counterName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tickets?: TicketUncheckedUpdateManyWithoutCounterNestedInput
  }

  export type TicketUpsertWithWhereUniqueWithoutServicedByStaffInput = {
    where: TicketWhereUniqueInput
    update: XOR<TicketUpdateWithoutServicedByStaffInput, TicketUncheckedUpdateWithoutServicedByStaffInput>
    create: XOR<TicketCreateWithoutServicedByStaffInput, TicketUncheckedCreateWithoutServicedByStaffInput>
  }

  export type TicketUpdateWithWhereUniqueWithoutServicedByStaffInput = {
    where: TicketWhereUniqueInput
    data: XOR<TicketUpdateWithoutServicedByStaffInput, TicketUncheckedUpdateWithoutServicedByStaffInput>
  }

  export type TicketUpdateManyWithWhereWithoutServicedByStaffInput = {
    where: TicketScalarWhereInput
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyWithoutServicedByStaffInput>
  }

  export type TicketScalarWhereInput = {
    AND?: TicketScalarWhereInput | TicketScalarWhereInput[]
    OR?: TicketScalarWhereInput[]
    NOT?: TicketScalarWhereInput | TicketScalarWhereInput[]
    id?: StringFilter<"Ticket"> | string
    ticketNumber?: StringFilter<"Ticket"> | string
    customerName?: StringFilter<"Ticket"> | string
    phoneNumber?: StringFilter<"Ticket"> | string
    preferredChannel?: EnumNotificationChannelFilter<"Ticket"> | $Enums.NotificationChannel
    status?: EnumTicketStatusFilter<"Ticket"> | $Enums.TicketStatus
    initialPosition?: IntFilter<"Ticket"> | number
    currentPosition?: IntFilter<"Ticket"> | number
    estimatedWaitTimeMinutes?: IntFilter<"Ticket"> | number
    skipCount?: IntFilter<"Ticket"> | number
    joinedAt?: DateTimeFilter<"Ticket"> | Date | string
    calledAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    servicedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    skippedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    cancelledAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    counterId?: StringNullableFilter<"Ticket"> | string | null
    servicedByStaffId?: StringNullableFilter<"Ticket"> | string | null
  }

  export type UserCreateWithoutActiveCounterInput = {
    id?: string
    employeeId: string
    fullName: string
    passwordHash: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    servicedTickets?: TicketCreateNestedManyWithoutServicedByStaffInput
  }

  export type UserUncheckedCreateWithoutActiveCounterInput = {
    id?: string
    employeeId: string
    fullName: string
    passwordHash: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    servicedTickets?: TicketUncheckedCreateNestedManyWithoutServicedByStaffInput
  }

  export type UserCreateOrConnectWithoutActiveCounterInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActiveCounterInput, UserUncheckedCreateWithoutActiveCounterInput>
  }

  export type TicketCreateWithoutCounterInput = {
    id?: string
    ticketNumber: string
    customerName: string
    phoneNumber: string
    preferredChannel?: $Enums.NotificationChannel
    status?: $Enums.TicketStatus
    initialPosition: number
    currentPosition: number
    estimatedWaitTimeMinutes?: number
    skipCount?: number
    joinedAt?: Date | string
    calledAt?: Date | string | null
    servicedAt?: Date | string | null
    completedAt?: Date | string | null
    skippedAt?: Date | string | null
    cancelledAt?: Date | string | null
    servicedByStaff?: UserCreateNestedOneWithoutServicedTicketsInput
    notificationLogs?: NotificationLogCreateNestedManyWithoutTicketInput
  }

  export type TicketUncheckedCreateWithoutCounterInput = {
    id?: string
    ticketNumber: string
    customerName: string
    phoneNumber: string
    preferredChannel?: $Enums.NotificationChannel
    status?: $Enums.TicketStatus
    initialPosition: number
    currentPosition: number
    estimatedWaitTimeMinutes?: number
    skipCount?: number
    joinedAt?: Date | string
    calledAt?: Date | string | null
    servicedAt?: Date | string | null
    completedAt?: Date | string | null
    skippedAt?: Date | string | null
    cancelledAt?: Date | string | null
    servicedByStaffId?: string | null
    notificationLogs?: NotificationLogUncheckedCreateNestedManyWithoutTicketInput
  }

  export type TicketCreateOrConnectWithoutCounterInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutCounterInput, TicketUncheckedCreateWithoutCounterInput>
  }

  export type TicketCreateManyCounterInputEnvelope = {
    data: TicketCreateManyCounterInput | TicketCreateManyCounterInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutActiveCounterInput = {
    update: XOR<UserUpdateWithoutActiveCounterInput, UserUncheckedUpdateWithoutActiveCounterInput>
    create: XOR<UserCreateWithoutActiveCounterInput, UserUncheckedCreateWithoutActiveCounterInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActiveCounterInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActiveCounterInput, UserUncheckedUpdateWithoutActiveCounterInput>
  }

  export type UserUpdateWithoutActiveCounterInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servicedTickets?: TicketUpdateManyWithoutServicedByStaffNestedInput
  }

  export type UserUncheckedUpdateWithoutActiveCounterInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servicedTickets?: TicketUncheckedUpdateManyWithoutServicedByStaffNestedInput
  }

  export type TicketUpsertWithWhereUniqueWithoutCounterInput = {
    where: TicketWhereUniqueInput
    update: XOR<TicketUpdateWithoutCounterInput, TicketUncheckedUpdateWithoutCounterInput>
    create: XOR<TicketCreateWithoutCounterInput, TicketUncheckedCreateWithoutCounterInput>
  }

  export type TicketUpdateWithWhereUniqueWithoutCounterInput = {
    where: TicketWhereUniqueInput
    data: XOR<TicketUpdateWithoutCounterInput, TicketUncheckedUpdateWithoutCounterInput>
  }

  export type TicketUpdateManyWithWhereWithoutCounterInput = {
    where: TicketScalarWhereInput
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyWithoutCounterInput>
  }

  export type CounterCreateWithoutTicketsInput = {
    id?: string
    counterNumber: number
    counterName: string
    isActive?: boolean
    updatedAt?: Date | string
    currentStaff?: UserCreateNestedOneWithoutActiveCounterInput
  }

  export type CounterUncheckedCreateWithoutTicketsInput = {
    id?: string
    counterNumber: number
    counterName: string
    isActive?: boolean
    updatedAt?: Date | string
    currentStaffId?: string | null
  }

  export type CounterCreateOrConnectWithoutTicketsInput = {
    where: CounterWhereUniqueInput
    create: XOR<CounterCreateWithoutTicketsInput, CounterUncheckedCreateWithoutTicketsInput>
  }

  export type UserCreateWithoutServicedTicketsInput = {
    id?: string
    employeeId: string
    fullName: string
    passwordHash: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    activeCounter?: CounterCreateNestedOneWithoutCurrentStaffInput
  }

  export type UserUncheckedCreateWithoutServicedTicketsInput = {
    id?: string
    employeeId: string
    fullName: string
    passwordHash: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    activeCounter?: CounterUncheckedCreateNestedOneWithoutCurrentStaffInput
  }

  export type UserCreateOrConnectWithoutServicedTicketsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutServicedTicketsInput, UserUncheckedCreateWithoutServicedTicketsInput>
  }

  export type NotificationLogCreateWithoutTicketInput = {
    id?: string
    channel: $Enums.NotificationChannel
    trigger: $Enums.NotificationTrigger
    message: string
    sentAt?: Date | string
  }

  export type NotificationLogUncheckedCreateWithoutTicketInput = {
    id?: string
    channel: $Enums.NotificationChannel
    trigger: $Enums.NotificationTrigger
    message: string
    sentAt?: Date | string
  }

  export type NotificationLogCreateOrConnectWithoutTicketInput = {
    where: NotificationLogWhereUniqueInput
    create: XOR<NotificationLogCreateWithoutTicketInput, NotificationLogUncheckedCreateWithoutTicketInput>
  }

  export type NotificationLogCreateManyTicketInputEnvelope = {
    data: NotificationLogCreateManyTicketInput | NotificationLogCreateManyTicketInput[]
    skipDuplicates?: boolean
  }

  export type CounterUpsertWithoutTicketsInput = {
    update: XOR<CounterUpdateWithoutTicketsInput, CounterUncheckedUpdateWithoutTicketsInput>
    create: XOR<CounterCreateWithoutTicketsInput, CounterUncheckedCreateWithoutTicketsInput>
    where?: CounterWhereInput
  }

  export type CounterUpdateToOneWithWhereWithoutTicketsInput = {
    where?: CounterWhereInput
    data: XOR<CounterUpdateWithoutTicketsInput, CounterUncheckedUpdateWithoutTicketsInput>
  }

  export type CounterUpdateWithoutTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    counterNumber?: IntFieldUpdateOperationsInput | number
    counterName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentStaff?: UserUpdateOneWithoutActiveCounterNestedInput
  }

  export type CounterUncheckedUpdateWithoutTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    counterNumber?: IntFieldUpdateOperationsInput | number
    counterName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentStaffId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUpsertWithoutServicedTicketsInput = {
    update: XOR<UserUpdateWithoutServicedTicketsInput, UserUncheckedUpdateWithoutServicedTicketsInput>
    create: XOR<UserCreateWithoutServicedTicketsInput, UserUncheckedCreateWithoutServicedTicketsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutServicedTicketsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutServicedTicketsInput, UserUncheckedUpdateWithoutServicedTicketsInput>
  }

  export type UserUpdateWithoutServicedTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeCounter?: CounterUpdateOneWithoutCurrentStaffNestedInput
  }

  export type UserUncheckedUpdateWithoutServicedTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeCounter?: CounterUncheckedUpdateOneWithoutCurrentStaffNestedInput
  }

  export type NotificationLogUpsertWithWhereUniqueWithoutTicketInput = {
    where: NotificationLogWhereUniqueInput
    update: XOR<NotificationLogUpdateWithoutTicketInput, NotificationLogUncheckedUpdateWithoutTicketInput>
    create: XOR<NotificationLogCreateWithoutTicketInput, NotificationLogUncheckedCreateWithoutTicketInput>
  }

  export type NotificationLogUpdateWithWhereUniqueWithoutTicketInput = {
    where: NotificationLogWhereUniqueInput
    data: XOR<NotificationLogUpdateWithoutTicketInput, NotificationLogUncheckedUpdateWithoutTicketInput>
  }

  export type NotificationLogUpdateManyWithWhereWithoutTicketInput = {
    where: NotificationLogScalarWhereInput
    data: XOR<NotificationLogUpdateManyMutationInput, NotificationLogUncheckedUpdateManyWithoutTicketInput>
  }

  export type NotificationLogScalarWhereInput = {
    AND?: NotificationLogScalarWhereInput | NotificationLogScalarWhereInput[]
    OR?: NotificationLogScalarWhereInput[]
    NOT?: NotificationLogScalarWhereInput | NotificationLogScalarWhereInput[]
    id?: StringFilter<"NotificationLog"> | string
    ticketId?: StringFilter<"NotificationLog"> | string
    channel?: EnumNotificationChannelFilter<"NotificationLog"> | $Enums.NotificationChannel
    trigger?: EnumNotificationTriggerFilter<"NotificationLog"> | $Enums.NotificationTrigger
    message?: StringFilter<"NotificationLog"> | string
    sentAt?: DateTimeFilter<"NotificationLog"> | Date | string
  }

  export type TicketCreateWithoutNotificationLogsInput = {
    id?: string
    ticketNumber: string
    customerName: string
    phoneNumber: string
    preferredChannel?: $Enums.NotificationChannel
    status?: $Enums.TicketStatus
    initialPosition: number
    currentPosition: number
    estimatedWaitTimeMinutes?: number
    skipCount?: number
    joinedAt?: Date | string
    calledAt?: Date | string | null
    servicedAt?: Date | string | null
    completedAt?: Date | string | null
    skippedAt?: Date | string | null
    cancelledAt?: Date | string | null
    counter?: CounterCreateNestedOneWithoutTicketsInput
    servicedByStaff?: UserCreateNestedOneWithoutServicedTicketsInput
  }

  export type TicketUncheckedCreateWithoutNotificationLogsInput = {
    id?: string
    ticketNumber: string
    customerName: string
    phoneNumber: string
    preferredChannel?: $Enums.NotificationChannel
    status?: $Enums.TicketStatus
    initialPosition: number
    currentPosition: number
    estimatedWaitTimeMinutes?: number
    skipCount?: number
    joinedAt?: Date | string
    calledAt?: Date | string | null
    servicedAt?: Date | string | null
    completedAt?: Date | string | null
    skippedAt?: Date | string | null
    cancelledAt?: Date | string | null
    counterId?: string | null
    servicedByStaffId?: string | null
  }

  export type TicketCreateOrConnectWithoutNotificationLogsInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutNotificationLogsInput, TicketUncheckedCreateWithoutNotificationLogsInput>
  }

  export type TicketUpsertWithoutNotificationLogsInput = {
    update: XOR<TicketUpdateWithoutNotificationLogsInput, TicketUncheckedUpdateWithoutNotificationLogsInput>
    create: XOR<TicketCreateWithoutNotificationLogsInput, TicketUncheckedCreateWithoutNotificationLogsInput>
    where?: TicketWhereInput
  }

  export type TicketUpdateToOneWithWhereWithoutNotificationLogsInput = {
    where?: TicketWhereInput
    data: XOR<TicketUpdateWithoutNotificationLogsInput, TicketUncheckedUpdateWithoutNotificationLogsInput>
  }

  export type TicketUpdateWithoutNotificationLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketNumber?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    preferredChannel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    initialPosition?: IntFieldUpdateOperationsInput | number
    currentPosition?: IntFieldUpdateOperationsInput | number
    estimatedWaitTimeMinutes?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    counter?: CounterUpdateOneWithoutTicketsNestedInput
    servicedByStaff?: UserUpdateOneWithoutServicedTicketsNestedInput
  }

  export type TicketUncheckedUpdateWithoutNotificationLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketNumber?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    preferredChannel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    initialPosition?: IntFieldUpdateOperationsInput | number
    currentPosition?: IntFieldUpdateOperationsInput | number
    estimatedWaitTimeMinutes?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    counterId?: NullableStringFieldUpdateOperationsInput | string | null
    servicedByStaffId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TicketCreateManyServicedByStaffInput = {
    id?: string
    ticketNumber: string
    customerName: string
    phoneNumber: string
    preferredChannel?: $Enums.NotificationChannel
    status?: $Enums.TicketStatus
    initialPosition: number
    currentPosition: number
    estimatedWaitTimeMinutes?: number
    skipCount?: number
    joinedAt?: Date | string
    calledAt?: Date | string | null
    servicedAt?: Date | string | null
    completedAt?: Date | string | null
    skippedAt?: Date | string | null
    cancelledAt?: Date | string | null
    counterId?: string | null
  }

  export type TicketUpdateWithoutServicedByStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketNumber?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    preferredChannel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    initialPosition?: IntFieldUpdateOperationsInput | number
    currentPosition?: IntFieldUpdateOperationsInput | number
    estimatedWaitTimeMinutes?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    counter?: CounterUpdateOneWithoutTicketsNestedInput
    notificationLogs?: NotificationLogUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateWithoutServicedByStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketNumber?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    preferredChannel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    initialPosition?: IntFieldUpdateOperationsInput | number
    currentPosition?: IntFieldUpdateOperationsInput | number
    estimatedWaitTimeMinutes?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    counterId?: NullableStringFieldUpdateOperationsInput | string | null
    notificationLogs?: NotificationLogUncheckedUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateManyWithoutServicedByStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketNumber?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    preferredChannel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    initialPosition?: IntFieldUpdateOperationsInput | number
    currentPosition?: IntFieldUpdateOperationsInput | number
    estimatedWaitTimeMinutes?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    counterId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TicketCreateManyCounterInput = {
    id?: string
    ticketNumber: string
    customerName: string
    phoneNumber: string
    preferredChannel?: $Enums.NotificationChannel
    status?: $Enums.TicketStatus
    initialPosition: number
    currentPosition: number
    estimatedWaitTimeMinutes?: number
    skipCount?: number
    joinedAt?: Date | string
    calledAt?: Date | string | null
    servicedAt?: Date | string | null
    completedAt?: Date | string | null
    skippedAt?: Date | string | null
    cancelledAt?: Date | string | null
    servicedByStaffId?: string | null
  }

  export type TicketUpdateWithoutCounterInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketNumber?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    preferredChannel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    initialPosition?: IntFieldUpdateOperationsInput | number
    currentPosition?: IntFieldUpdateOperationsInput | number
    estimatedWaitTimeMinutes?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicedByStaff?: UserUpdateOneWithoutServicedTicketsNestedInput
    notificationLogs?: NotificationLogUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateWithoutCounterInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketNumber?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    preferredChannel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    initialPosition?: IntFieldUpdateOperationsInput | number
    currentPosition?: IntFieldUpdateOperationsInput | number
    estimatedWaitTimeMinutes?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicedByStaffId?: NullableStringFieldUpdateOperationsInput | string | null
    notificationLogs?: NotificationLogUncheckedUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateManyWithoutCounterInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketNumber?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    preferredChannel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    initialPosition?: IntFieldUpdateOperationsInput | number
    currentPosition?: IntFieldUpdateOperationsInput | number
    estimatedWaitTimeMinutes?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicedByStaffId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NotificationLogCreateManyTicketInput = {
    id?: string
    channel: $Enums.NotificationChannel
    trigger: $Enums.NotificationTrigger
    message: string
    sentAt?: Date | string
  }

  export type NotificationLogUpdateWithoutTicketInput = {
    id?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    trigger?: EnumNotificationTriggerFieldUpdateOperationsInput | $Enums.NotificationTrigger
    message?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationLogUncheckedUpdateWithoutTicketInput = {
    id?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    trigger?: EnumNotificationTriggerFieldUpdateOperationsInput | $Enums.NotificationTrigger
    message?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationLogUncheckedUpdateManyWithoutTicketInput = {
    id?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    trigger?: EnumNotificationTriggerFieldUpdateOperationsInput | $Enums.NotificationTrigger
    message?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}